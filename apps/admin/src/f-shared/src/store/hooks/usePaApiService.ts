import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addErrors, Endpoint_Enum } from '@admin/shared';
import { ErrorResponse } from '@freelbee/shared/error';

export function usePaApiService<T>(Service: {
  new(setError: (title: string, error: ErrorResponse, method: Endpoint_Enum | string) => void): T;
}) {

  const setError = (title: string, errors: ErrorResponse, method: Endpoint_Enum | string) => {
    dispatch(addErrors({
      id: new Date().getUTCMilliseconds(),
      title: title,
      description: '',
      errors,
      method: method
    }));
  };

  const dispatch = useDispatch();
  const [apiService, setApiService] = useState<T>(new Service(setError));

  return apiService;
}
