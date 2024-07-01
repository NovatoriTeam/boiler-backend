import { BaseException } from './base.exception';
import { ExceptionCodes } from './exception.codes';
/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 */
export class ArgumentInvalidException extends BaseException {
  readonly code = ExceptionCodes.ARGUMENT_INVALID;
}
