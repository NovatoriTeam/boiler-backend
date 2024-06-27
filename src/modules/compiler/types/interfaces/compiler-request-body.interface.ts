import { CompilerLanguageEnum } from '../enums/compiler-language.enum';

export interface CompilerRequestBodyInterface {
  language: CompilerLanguageEnum;
  stdin: string;
  files: [{ name: string; content: string }];
}
