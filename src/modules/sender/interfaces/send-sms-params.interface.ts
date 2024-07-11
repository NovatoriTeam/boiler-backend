import { SmsTypeEnum } from '../enums/sms-type.enum';

export interface SendSmsParamsInterface {
  phone: string;
  content: string;
  type: SmsTypeEnum;
  isGeorgian: boolean;
}
