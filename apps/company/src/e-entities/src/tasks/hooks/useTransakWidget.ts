import { Transak, TransakConfig } from '@transak/transak-sdk';

// const environment = Transak.ENVIRONMENTS.PRODUCTION;
const environment = process.env.NEXT_PUBLIC_TRANSAK_API_KEY ? Transak.ENVIRONMENTS.PRODUCTION : Transak.ENVIRONMENTS.STAGING;

export const TRANSAK_DEVELOP_API_KEY = 'a275e12f-eeff-4986-ab99-3c990a3d72da';

const apiKey = process.env.NEXT_PUBLIC_TRANSAK_API_KEY ?? TRANSAK_DEVELOP_API_KEY;
// const apiKey = '753384e1-e5c4-4308-bca7-63983a84871f';

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
