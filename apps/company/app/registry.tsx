'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import {
  createGlobalStyle,
  ServerStyleSheet,
  StyleSheetManager,
} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    -webkit-text-size-adjust: 100%;
    line-height: 1.5;
    tab-size: 4;
    scroll-behavior: smooth;
  }
  body {
    font-family: inherit;
    line-height: inherit;
    margin: 0;
  }
  h1,
  h2,
  p,
  pre {
    margin: 0;
  }
  *,
  ::before,
  ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: currentColor;
  }
  h1,
  h2 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }

`;

export function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();

    // Types are out of date, clearTag is not defined.
    // See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/65021
    (
      styledComponentsStyleSheet.instance as unknown as { clearTag: () => void }
    ).clearTag();

    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <>
      <GlobalStyle />
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
        {children}
      </StyleSheetManager>
    </>
  );
}
