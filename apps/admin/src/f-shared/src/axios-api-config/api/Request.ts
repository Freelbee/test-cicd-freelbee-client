import { AxiosRequestConfig } from 'axios';
import { Token_Enum } from '../../rtk-api-config/enums/Token_Enum';
import { ApiMethodsWithoutToken, Endpoint_Enum } from '../../rtk-api-config/enums/Endpoint_Enum';

const hostMap = new Set(ApiMethodsWithoutToken);

type RequestParams = null | {
  [key: string]: string | number
}

export class Request<BodyT, ParamsT extends RequestParams = {}> {
  private readonly config: AxiosRequestConfig;
  private readonly url: Endpoint_Enum;

  constructor(props: {
    url: Endpoint_Enum,
    params?: ParamsT,
    body?: BodyT,
    templates?: Array<string | number>,
    additionalHeaders?: { [key: string]: string }
    additionalConfig?: AxiosRequestConfig
  }) {
    const { url, params, body, templates, additionalHeaders = {}, additionalConfig } = props;
    this.url = url;
    this.config = {
      url: url.format(...templates ?? []),
      params: params,
      data: body,
      headers: {
        ...additionalHeaders
      },
      ...additionalConfig
    };
  }

  public getConfig(): AxiosRequestConfig {
    const auth = (() => {
      if (!hostMap.has(this.url) && localStorage.getItem(Token_Enum.ACCESS_TOKEN)) {
        return {
          'Authorization': `Bearer ` + localStorage.getItem(Token_Enum.ACCESS_TOKEN) ?? ''
        };
      }
      return {};
    })();

    return {
      ...this.config,
      headers: {
        ...(this.config.headers as { [key: string]: string }),
        ...auth
      }
    };
  }
}
