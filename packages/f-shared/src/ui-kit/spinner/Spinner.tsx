import styled, {keyframes} from 'styled-components';
import { Color } from '../style-base/enums/enums';

type Props = {
    loading: boolean,
    size: number
};
export default function Spinner (props: Props) {
    const {loading, size} = props;

    return (
        <Container load={loading} size={size}/>
    );
}

const Spin = keyframes`
  from{
    transform: rotate(0deg);
  }to{
     transform: rotate(360deg);
   }
`;


const Container = styled.div<{ load: boolean, size: number }>`
  width: ${({size})=>size}px;
  height: ${({size})=>size}px;

  border: 2px solid #f3f3f3;
  border-top:3px solid ${Color.EMERALD};
  border-radius: 100%;

  //position: absolute;
  //top:0;
  //bottom:0;
  //left:0;
  //right: 0;
  //margin: auto;
  
  transition: .5s;
  
  animation: ${Spin} ${({load})=>load ? '1' : '.5'}s  infinite linear;
`;