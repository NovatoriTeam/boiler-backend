import { BaseException } from '../base.exception';
import { ExceptionCodes } from '../exception.codes';

describe('Exception', () => {
  const stackRegex: RegExp =
    /TestException: message\n.*at Object\.<anonymous> \(.*\/src\/shared\/exceptions\/tests\/base\.exception\.spec\.ts:/;
  const code: string = 'TEST_CODE';

  class TestException extends BaseException {
    code = code;
  }

  describe('constructor', () => {
    it('should set message', () => {
      const message: string = 'message';
      const err: TestException = new TestException(message);

      expect(err.message).toBe(message);
    });

    it('should set name', () => {
      const err: TestException = new TestException('TEST');

      expect(err.name).toBe('TestException');
    });

    it('should capture stack trace', () => {
      const stack: string = 'STACKTRACE';
      jest.spyOn(Error, 'captureStackTrace').mockImplementation(() => stack);

      const err: TestException = new TestException('message');

      expect(Error.captureStackTrace).toHaveBeenCalledWith(err, TestException);
      expect(err.stack).toMatch(stackRegex);
    });
  });

  describe('toJSON', () => {
    it('should serialize error object', () => {
      const message: string = 'message';

      const err: TestException = new TestException(message);

      expect(err.toJSON()).toStrictEqual(
        expect.objectContaining({
          name: 'TestException',
          message,
          stack: expect.stringMatching(stackRegex),
          code,
        }),
      );
    });
  });

  describe('serialize', () => {
    it('should serialize an instance of Exception', () => {
      const message: string = 'test message';
      const err: TestException = new TestException(message);
      jest.spyOn(err, 'toJSON');

      expect(BaseException.serialize(err)).toStrictEqual(
        expect.objectContaining({
          name: 'TestException',
          message,
          stack: expect.stringMatching(
            /TestException: test message\n.*at Object\.<anonymous> \(.*\/src\/shared\/exceptions\/tests\/base\.exception\.spec\.ts:/,
          ),
          code,
        }),
      );
      // eslint-disable-next-line jest/prefer-called-with
      expect(err.toJSON).toHaveBeenCalled();
    });

    it('should serialize a native error object', () => {
      const message: string = 'test message';

      const err: TypeError = new TypeError(message);

      expect(BaseException.serialize(err)).toStrictEqual(
        expect.objectContaining({
          name: 'TypeError',
          message,
          stack: expect.stringMatching(
            /TypeError: test message\n.*at Object\.<anonymous> \(.*\/src\/shared\/exceptions\/tests\/base\.exception\.spec\.ts:/,
          ),
          code: ExceptionCodes.UNKNOWN_EXCEPTION,
        }),
      );
    });
  });
});
