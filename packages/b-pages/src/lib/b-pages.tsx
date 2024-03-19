import styled from 'styled-components';


/* eslint-disable-next-line */
export interface BPagesProps {}




const StyledBPages = styled.div`
  color: pink;
`;

export function BPages(props: BPagesProps) {
  return (
    <StyledBPages>
      <h1>Welcome to BPages!</h1>
    </StyledBPages>
  );
}

export default BPages;
