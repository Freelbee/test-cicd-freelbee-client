'use client';

import { createContext } from 'react';
import { CounterpartyDtoModified } from '@freelbee/entities';

export enum CompanyNavigationTab {
  PRIMARY_INFO = 'PRIMARY_INFO',
  DOCUMENTS = 'DOCUMENTS',
  METHODS = 'METHODS',
}

export interface ICompanyNavigationContext {
  company: CounterpartyDtoModified;
  companyNavigationTab: CompanyNavigationTab;
  setCompanyNavigationTab: (step: CompanyNavigationTab) => void;
}

export const CompanyNavigationContext = createContext<ICompanyNavigationContext>({
  // @ts-expect-error //@typescript-eslint/ban-ts-comment
  company: {},
  companyNavigationTab: CompanyNavigationTab.PRIMARY_INFO,
  setCompanyNavigationTab: () => {}
});
