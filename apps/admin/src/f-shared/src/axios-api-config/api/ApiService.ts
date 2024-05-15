import { ApiRequest } from './ApiRequest';
import { ErrorResponse } from '@freelbee/shared/error';
import { Endpoint_Enum } from '../../rtk-api-config/enums/Endpoint_Enum';

export class ApiService {
  protected setError: (title: string, error: ErrorResponse, method: Endpoint_Enum | string) => void;
  protected apiRequest: ApiRequest;

  constructor(setError: (title: string, error: ErrorResponse, method: Endpoint_Enum | string) => void, url?: string) {
    this.setError = setError;
    this.apiRequest = new ApiRequest(setError, url);
  }
}
