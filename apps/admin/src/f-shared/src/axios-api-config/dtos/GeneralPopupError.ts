import { ErrorResponse } from '@freelbee/shared/error';
import { Endpoint_Enum } from '@admin/shared';

export interface GeneralPopupError {
  id: number,
  title: string,
  description: string,
  errors: ErrorResponse,
  method: Endpoint_Enum | string
}
