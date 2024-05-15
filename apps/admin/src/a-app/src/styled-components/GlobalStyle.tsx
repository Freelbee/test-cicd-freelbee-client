'use client';

import { Color } from '@freelbee/shared/ui-kit';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    background-color: ${Color.GRAY_200};
  }

  button {
    background-color: transparent;
    border: none;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button:focus,
  a:focus,
  [tabindex="0"]:focus {
    outline: 3px solid #D7DBEB;
  }

  a:focus:not(:focus-visible),
  button:focus:not(:focus-visible),
  [tabindex="0"]:focus:not(:focus-visible) {
    outline: none;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;
