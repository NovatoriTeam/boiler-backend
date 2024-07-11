import { SmsStatusEnum } from '../enums/sms-status.enum';
import { SmsStatusResponseEnum } from '../enums/sms-status.response.enum';

export const smsDeliverStatusEnumMap = {
  [SmsStatusResponseEnum.Delivered]: SmsStatusEnum.Delivered,
  [SmsStatusResponseEnum.Pending]: SmsStatusEnum.Pending,
  [SmsStatusResponseEnum.Undelivered]: SmsStatusEnum.Undelivered,
  [SmsStatusResponseEnum.Unknown]: SmsStatusEnum.Unknown,
};
