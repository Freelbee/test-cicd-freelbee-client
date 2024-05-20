'use client';

import { createContext } from 'react';
import { CompanyData } from '@admin/entities';

export enum CompanyNavigationTab {
  PRIMARY_INFO = 'PRIMARY_INFO',
  ACCOUNTS = 'ACCOUNTS',
  DOCUMENTS = 'DOCUMENTS',
  METHODS = 'METHODS',
}

export interface ICompanyNavigationContext {
  company: CompanyData;
  companyNavigationTab: CompanyNavigationTab;
  setCompanyNavigationTab: (step: CompanyNavigationTab) => void;
}

export const CompanyNavigationContext = createContext<ICompanyNavigationContext>({
  company: {},
  companyNavigationTab: CompanyNavigationTab.PRIMARY_INFO,
  setCompanyNavigationTab: () => {},
});
