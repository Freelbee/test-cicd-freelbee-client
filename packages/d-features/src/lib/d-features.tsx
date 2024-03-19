import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DFeaturesProps {}

const StyledDFeatures = styled.div`
  color: pink;
`;

export function DFeatures(props: DFeaturesProps) {
  return (
    <StyledDFeatures>
      <h1>Welcome to DFeatures!</h1>
    </StyledDFeatures>
  );
}

export default DFeatures;
