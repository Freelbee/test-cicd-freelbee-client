import styled from 'styled-components';

/* eslint-disable-next-line */
export interface CWidgetsProps {}

const StyledCWidgets = styled.div`
  color: #efffc0;
`;

export function CWidgets(props: CWidgetsProps) {
  return (
    <StyledCWidgets>
      <h1>Welcome to Widgets!</h1>
    </StyledCWidgets>
  );
}

export default CWidgets;
