import styled from 'styled-components';

const ArrowX = styled.div<{isOpen: boolean, startPosition: number}>`
  background: url("../../../assets/icons/arrow-icons/arrow_down.svg") center center no-repeat;
  transform: scaleY(${({ isOpen, startPosition }) => isOpen ? startPosition * -1 : startPosition});
  width: 14px;
  height: 14px;
  transition: transform 0.5s;
`;

export default ArrowX;
