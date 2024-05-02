import styled from 'styled-components';


const ArrowY = styled.div<{isOpen?: boolean, startPosition: number}>`
  background: url("../../../assets/icons/arrow-icons/arrow_down.svg") center center no-repeat;
  transform: rotate(${({ startPosition }) => startPosition * -90}deg);
  width: 14px;
  height: 14px;
  transition: transform 0.5s;
`;
export default ArrowY;
