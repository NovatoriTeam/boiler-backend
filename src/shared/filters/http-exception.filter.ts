import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { HttpError } from '../exceptions/http-convertable.exception.interface';

const buildBoilerException = ({
  code,
  message,
}: {
  code: string | number;
  message: string;
}): HttpError => ({
  code,
  message,
  messageTranslationKey: `errors.http.${code}`,
});

interface ExceptionResponseInterface {
  message: string | string[];
  error: string;
  status: number;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response: Response<
      unknown,
      Record<string, unknown>
    > = context.getResponse<Response>();

    let errors: HttpError[] = [
      buildBoilerException({
        code: exception.getStatus(),
        message: exception.message,
      }),
    ];
    const exceptionResponse: ExceptionResponseInterface =
      exception.getResponse() as ExceptionResponseInterface;
    if (Array.isArray(exceptionResponse.message)) {
      errors = exceptionResponse.message.map((errorMessage: string) =>
        buildBoilerException({
          code: exceptionResponse.status,
          message: errorMessage,
        }),
      );
    }

    response.status(exception.getStatus()).json({
      status: exception.getStatus(),
      errors,
    });
  }
}
