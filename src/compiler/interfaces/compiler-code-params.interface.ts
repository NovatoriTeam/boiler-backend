import { CompilerExtensionEnum } from '../enums/compiler-extension.enum';
import { CompilerLanguageEnum } from '../enums/compiler-language.enum';

export interface CompilerCodeParamsInterface {
  code: string;
  language: CompilerLanguageEnum;
  extension: CompilerExtensionEnum;
  fileName: string;
}
