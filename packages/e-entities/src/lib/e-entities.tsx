import styled from 'styled-components';

/* eslint-disable-next-line */
export interface EEntitiesProps {}

const StyledEEntities = styled.div`
  color: pink;
`;

export function EEntities(props: EEntitiesProps) {
  return (
    <StyledEEntities>
      <h1>Welcome to EEntities!</h1>
    </StyledEEntities>
  );
}

export default EEntities;
