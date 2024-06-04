import { Transak, TransakConfig } from '@transak/transak-sdk';


const environment = process.env.NEXT_PUBLIC_TRANSAK_API_KEY ? Transak.ENVIRONMENTS.PRODUCTION : Transak.ENVIRONMENTS.STAGING;
const apiKey = process.env.NEXT_PUBLIC_TRANSAK_API_KEY ?? '';

const transakConfig: TransakConfig = {
  apiKey,
  environment,
  hideMenu: true
};

export function useTransakWidget() {
  return (confData: TransakConfig) => {
    const conf = {
      ...transakConfig,
      ...confData
    };
    return new Transak(conf);
  };
}
