import { SmsStatusResponseEnum } from '../enums/sms-status.response.enum';

export interface SendSmsResponseInterface {
  data: { messageId: string; statusId: SmsStatusResponseEnum }[];
}
