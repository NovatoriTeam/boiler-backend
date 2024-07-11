import { setTimeout } from 'timers/promises';
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import twilio from 'twilio';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { senderConfig } from '../../config/config';
import { SenderRequestTypeEnum } from './enums/sender-request-type.enum';
import { SenderTypeEnum } from './enums/sender-type.enum';
import { SmsStatusEnum } from './enums/sms-status.enum';
import { SmsStatusResponseEnum } from './enums/sms-status.response.enum';
import { SmsTypeEnum } from './enums/sms-type.enum';
import { SendSmsParamsInterface } from './interfaces/send-sms-params.interface';
import { SendSmsRequestQueryParameters } from './interfaces/send-sms-request-query-parameters.interface';
import { SendSmsResponseInterface } from './interfaces/send-sms-response.interface';
import { SenderRepository } from './repositories/sender.repository';
import { smsDeliverStatusEnumMap } from './utils/sender-deliver-status.map';

@Injectable()
export class SenderService {
  constructor(private senderRepository: SenderRepository) {}

  async sendSms(
    data: SendSmsParamsInterface,
  ): Promise<SendSmsResponseInterface>;
  async sendSms(data: SendSmsParamsInterface): Promise<VerificationInstance>;
  async sendSms(
    data: SendSmsParamsInterface,
  ): Promise<SendSmsResponseInterface | VerificationInstance> {
    const { phone, content, type, isGeorgian } = data;
    const senderType = isGeorgian
      ? SenderTypeEnum.SenderGe
      : SenderTypeEnum.Twilio;

    const newSenderLogData = {
      phone,
      content,
      sender: senderType,
    };

    if (senderType === SenderTypeEnum.SenderGe) {
      Object.assign(newSenderLogData, {
        status: SmsStatusEnum.Unknown,
      });
    }

    const senderLog = await this.senderRepository.create(newSenderLogData);
    if (isGeorgian) {
      return await this.sendMessageToGeorgianUser({
        phone,
        content,
        type,
        senderLogId: senderLog.id,
      });
    } else {
      return await this.sendSmsToNonGeorgianUser(phone);
    }
  }

  private generateSenderRequestQueryParameters(data: {
    content: string;
    type: SmsTypeEnum;
    phone: string;
  }): SendSmsRequestQueryParameters {
    const { content, type, phone } = data;

    return {
      apikey: senderConfig.apiKey,
      content,
      smsno: type,
      destination: phone,
      urgent: 1,
    };
  }

  async getSmsDeliverStatusById(
    messageId: string,
    retry?: number,
  ): Promise<SmsStatusResponseEnum> {
    if (retry ?? 0 > 4) {
      return SmsStatusResponseEnum.Unknown;
    }
    await setTimeout(5000 * retry ?? 0);
    const result = await axios.get(
      this.getSenderUrl(SenderRequestTypeEnum.GetSmsDeliverStatus),
      {
        params: { messageId, apikey: senderConfig.apiKey },
      },
    );

    const statusId = result.data.data[0].statusId;

    if (statusId === SmsStatusResponseEnum.Delivered) {
      return SmsStatusResponseEnum.Delivered;
    } else {
      return await this.getSmsDeliverStatusById(messageId, (retry ?? 0) + 1);
    }
  }

  private getSenderUrl(type: SenderRequestTypeEnum): string {
    return `${senderConfig.apiUrl}/${type}.php`;
  }

  private async sendMessageToGeorgianUser(data: {
    phone: string;
    content: string;
    type: SmsTypeEnum;
    senderLogId: number;
  }): Promise<SendSmsResponseInterface> {
    try {
      const { phone, content, type, senderLogId } = data;
      const sms: AxiosResponse<SendSmsResponseInterface> = await axios.get(
        this.getSenderUrl(SenderRequestTypeEnum.SendSms),
        {
          params: this.generateSenderRequestQueryParameters({
            phone,
            content,
            type,
          }),
        },
      );

      const { messageId } = sms.data.data[0];

      const smsStatus: SmsStatusResponseEnum =
        await this.getSmsDeliverStatusById(messageId);

      await this.senderRepository.update(senderLogId, {
        status: smsDeliverStatusEnumMap[smsStatus],
      });

      return sms.data as SendSmsResponseInterface;
    } catch (err) {
      throw err;
    }
  }

  private async sendSmsToNonGeorgianUser(
    phone: string,
  ): Promise<VerificationInstance> {
    const client = twilio(
      senderConfig.twilioSecretId,
      senderConfig.twilioToken,
    );

    return (await client.verify.v2
      .services(senderConfig.twilioVerificationServiceId)
      .verifications.create({
        to: `+${phone}`,
        channel: 'sms',
      })) as VerificationInstance;
  }
}
