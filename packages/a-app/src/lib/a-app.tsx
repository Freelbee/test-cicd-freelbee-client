import styled from 'styled-components';

/* eslint-disable-next-line */
export interface AAppProps {}

const StyledAApp = styled.div`
  color: pink;
`;

export function AApp(props: AAppProps) {
  return (
    <StyledAApp>
      <h1>Welcome to AApp!</h1>
    </StyledAApp>
  );
}

export default AApp;
