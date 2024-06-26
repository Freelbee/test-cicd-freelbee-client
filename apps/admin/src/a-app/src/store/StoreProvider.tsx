'use client';

import { AppStore, setupStore } from '@admin/features';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = setupStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
