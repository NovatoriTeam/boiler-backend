export interface HttpError {
  code: string | number;
  message: string;
  messageTranslationKey: string;
}
export interface HttpErrorResponseBody {
  statusCode: number;
  errors: HttpError[];
}

/**
 * Base class for custom http exceptions.
 */
export interface HttpConvertableExceptionInterface {
  getHttpResponseBody(): HttpErrorResponseBody;
  getHttpResponseCode(): number;
}
