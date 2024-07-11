import { SmsTypeEnum } from '../enums/sms-type.enum';

export interface SendSmsRequestQueryParameters {
  apikey: string;
  content: string;
  smsno: SmsTypeEnum;
  destination: string;
  urgent: number;
}
