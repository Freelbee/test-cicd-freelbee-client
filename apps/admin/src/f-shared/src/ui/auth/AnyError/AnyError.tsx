import { Paragraph } from '../Paragraph/Paragraph';
import { ColorType } from '../../../utils/ColorType';
import { ApiResponseError } from '../../../rtk-api-config/dtos-temp/ApiResponseError';

type Props = {
  error: ApiResponseError | null,
  exceptFields: Array<string>
}

export function AnyError(props: Props) {

  const { error, exceptFields } = props;

  if (!error) {
    return <></>;
  }

  return (
    <Paragraph color={ColorType.ERROR_COLOR}>
      {error.getAnyError(exceptFields)}
    </Paragraph>
  );
}
