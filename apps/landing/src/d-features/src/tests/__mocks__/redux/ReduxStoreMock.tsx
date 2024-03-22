import { Provider } from 'react-redux';
import type { ReactNode } from 'react';
import { store } from '@landing/features';

export function ReduxStoreMock (props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}
