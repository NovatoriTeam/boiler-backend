import { ExceptionCodes } from './exception.codes';

export interface SerializedException {
  name: string;
  message: string;
  stack?: string;
  code: string;
  relatedId?: string;
}

/**
 * Base class for custom exceptions.
 */
export abstract class BaseException extends Error {
  abstract code: string;
  /**
   * **BE CAREFUL** not to include sensitive info in 'metadata'
   * to prevent leaks since all exception's data will end up
   * in application's log files. Only include non-sensitive
   * info that may help with debugging.
   */
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * By default in NodeJS Error objects are not
   * serialized properly when sending plain objects
   * to external processes. This method is a workaround.
   * Keep in mind not to return a stack trace to user when in production.
   * https://iaincollins.medium.com/error-handling-in-javascript-a6172ccdf9af
   */
  toJSON(): SerializedException {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      code: this.code,
    };
  }

  /**
   * Serializes any native JS Error into a SerializedException.
   */
  static serialize(error: BaseException | Error): SerializedException {
    if (error instanceof BaseException) {
      return error.toJSON();
    }

    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: ExceptionCodes.UNKNOWN_EXCEPTION,
    };
  }
}
