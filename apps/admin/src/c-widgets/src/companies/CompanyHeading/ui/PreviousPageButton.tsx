import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ReactComponent as ArrowLeftIcon } from '@freelbee/assets/icons/arrow-icons/arrow_back.svg';

export function PreviousPageButton() {
  const router = useRouter();

  return (
    <Container>
      <Button onClick={() => router.push('/companies')}>
        <ArrowLeftIcon />
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

const Button = styled.div`
  border-radius: 50px;
  height: 40px;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  transition: 0.1s background-color;

  &:hover {
    background-color: #edf4f6;
  }
`;
