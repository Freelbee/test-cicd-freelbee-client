import { ErrorsResponse, ValidationErrors } from '@freelbee/shared/error';

export class ApiResponseError {
  private errors: ValidationErrors = [];
  private code: number;

  private defaultMessage = {
    en: 'Unknown Error'
  };

  constructor(errors: ErrorsResponse, code: number) {
    this.errors = errors.messages;
    this.code = code;
  }

  public getAnyError = (except: Array<string>): string => {
    const error = this.errors?.filter(error => error.field && !except.includes(error.field))?.[0]?.text.en;

    if (this.code === 400 && !error) {
      return '400: Bad request!';
    }
    if (this.code === 502 && !error) {
      return '502: ошибка стороннего сервиса!';
    }
    if (this.code === 500 && !error) {
      return '500: ошибка сервиса!';
    }
    if (this.code === 403 && !error) {
      return '403: Доступ запрещен!';
    }

    if (!error) {
      return this.code + ' ' + this.defaultMessage;
    }

    return error;
  };
}
