'use client';

import { createContext } from 'react';

export interface ILayoutContext {
  setNavigationMenuOpened: (opened: boolean) => void;
  navigationMenuOpened: boolean;
}

export const LayoutContext = createContext<ILayoutContext>({
  setNavigationMenuOpened: () => {},
  navigationMenuOpened: false
});
