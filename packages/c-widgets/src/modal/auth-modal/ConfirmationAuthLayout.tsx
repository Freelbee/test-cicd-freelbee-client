import React, {createRef, RefObject, useEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components';


import {ReactComponent as ArrIcon} from "@freelbee/assets/icons/arrow-icons/long_arrow.svg"
import Timer from "./Timer";
import {Breakpoint, Color, IconPosition, mediaBreakpointDown, typography} from "@freelbee/shared/ui-kit";
import {Button, LinkButton} from "@freelbee/features/common";

type Props = {
  description: string,
  sendCode: () => Promise<void>,
  checkCode: (code: string) => Promise<void>,
  getSessionState: () => Promise<{ needSend: boolean, resendRemain: number }>,
  buttonText?: string
};

const CODE_LENGTH = 4;

export default function ConfirmationAuthLayout(props: Props) {
  const {getSessionState, description, sendCode, checkCode, buttonText} = props;

  const [code, setCode] = useState<string[]>([``, ``, ``, ``]);
  const [focusPosition, setFocusPosition] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [resendRemain, setResendRemain] = useState<number>(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const codeInputsRefs: RefObject<HTMLInputElement>[] = [];

  for (let i = 0; i < CODE_LENGTH; i++) {
    codeInputsRefs.push(createRef<HTMLInputElement>());
  }

  useEffect(() => {
    if (focusPosition < code.length) {
      codeInputsRefs[focusPosition].current?.focus();
    }
  }, [focusPosition]);

  const goLeft = () => {
    const position = (focusPosition - 1) >= 0 ? focusPosition - 1 : code.length - 1;
    setFocusPosition(position);
  };

  const goLeftAndStop = () => {
    const position = (focusPosition - 1) >= 0 ? focusPosition - 1 : 0;
    setFocusPosition(position);
  };

  const goRight = () => {
    const position = focusPosition + 1;
    setFocusPosition(position % code.length);
  };

  const goRightAndStop = () => {
    const position = focusPosition + 1;
    setFocusPosition(Math.min(position, code.length - 1));
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case `ArrowRight`:
        goRight();
        break;
      case `ArrowLeft`:
        goLeft();
        break;
      case `Backspace`:
        setCodeChar(index, ``);
        goLeftAndStop();
        break;
      case `Enter`:
        if (index === code.length - 1) {
          return buttonRef.current?.focus();
        }
        e.preventDefault();
        goRight();
        break;
      default:
        break;
    }
  };

  const setCodeChar = (position: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    value = value.replace(/^.+([0-9])$/, `$1`);
    setCode((prevState: string[]): string[] => {
      const newState = [...prevState];
      newState[position] = value;
      return newState;
    });
    if (position === 3) {
      return buttonRef.current?.focus();
    }
    if (value.length > 0 && position < code.length - 1) {
      goRightAndStop();
    } else if (value.length === 0 && position > 0 && position < code.length - 1) {
      goLeftAndStop();
    }
  };

  const paste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData(`Text`)
      .replace(/[^0-9]/g, ``)
      .slice(0, CODE_LENGTH);

    if (text.length !== CODE_LENGTH) return;
    setCode(Array.from(text));
    setFocusPosition(code.length - 1);
  };

  const timer = new Timer((time) => setResendRemain(time));

  const onSend = () => {
    setLoading(true);
    sendCode().unwrap()
      .then(res => {
        if (res.isSuccess) {
          setLoading(false)
        }
      })
  };

  const sendCheckCodeForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (code.join(``).length !== CODE_LENGTH) return;
    setLoading(true);
    checkCode(code.join(``)).unwrap()
      .then((response) => {
        console.log(response)
        localStorage.setItem('ACCESS_TOKEN', response);
      })
      .finally(() => {
        timer.stop();
        setResendRemain(0);
        setLoading(false)
      });
  };

  const getResendCode = () => {
    if (loading) {
      return <></>;
    }
    return (
      <ResendContainer>
        {
          resendRemain > 0 &&
          <RemainingText color={Color.GRAY_600}>
            {`${getRemainingTime(resendRemain)} left until code expires`}
          </RemainingText>
        }
        {
          resendRemain <= 0 &&
          <LinkButton
            as='button'
            onClick={() => sendCode().unwrap().then(() => {
              console.log('timer should be restarted')
              getSessionState().then((state) => {
                console.log('got session state' + state.resendRemain)
                setLoading(false);
                timer.start(state.resendRemain);
              });
            })}
          >
            Resend code
          </LinkButton>
        }

      </ResendContainer>
    );
  };

  const getRemainingTime = (remainingTimeOfCode: number) => {
    const minutes = parseInt(String(remainingTimeOfCode / 60));
    const seconds = remainingTimeOfCode % 60;

    const timeFormat = (value: number): string => {
      if (value === 0) return `00`;
      if (value < 10) return `0${value}`;
      return `${value}`;
    };
    return `${timeFormat(minutes)}:${timeFormat(seconds)}`;
  };

  useEffect(() => {
    getSessionState().then((state) => {
      if (state.needSend) {
        return onSend();
      }
      setLoading(false);
      timer.start(state.resendRemain);

      return () => {
        timer.stop();
        setLoading(true);
        setResendRemain(0);
      };
    })
  }, []);


  return (
    <Container onSubmit={sendCheckCodeForm}>
      <FormCode>
        <Heading>
          <Title>
            Enter confirmation code
          </Title>
          <Text1>
            {description}
          </Text1>
        </Heading>
        <InputContainers>
          {
            codeInputsRefs.map((ref, index) => (
              <SquareInput
                inputMode={`numeric`}
                maxLength={1}
                type={'number'}
                name={`code-${index}`}
                key={index}
                ref={ref}
                value={code[index]}
                onFocus={(e) => {
                  e.target.select();
                  setFocusPosition(index);
                }}
                onKeyDown={e => handleKeyDown(index, e)}
                onInput={e => setCodeChar(index, e.currentTarget.value)}
                onPaste={paste}
              />
            ))
          }
        </InputContainers>
        <RemainCodeInfo>
          {getResendCode()}
        </RemainCodeInfo>
        <ButtonContainer>
          <Button
            styles={buttonStyles}
            ref={buttonRef}
            disabled={code.filter(ch => ch !== '').length !== CODE_LENGTH || loading}
            isLoading={loading}
            Icon={<ArrIcon/>}
            iconPosition={IconPosition.RIGHT}>
            {buttonText ?? 'Confirm'}
          </Button>
        </ButtonContainer>
      </FormCode>
    </Container>
  );
}

const RemainingText = styled.span`
  color: ${Color.GRAY_800};
  margin: 0;
  padding: 0;
  transition: color 0.5s;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
  max-height: 500px;
`;

const FormCode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 32px;
  max-width: 320px;
`;

const Heading = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 8px;
`;

const Title = styled.div`
  ${typography.heading1};
  color: ${Color.GRAY_900};
`;

const Text1 = styled.div`
  ${typography.body};
  color: ${Color.GRAY_900};
`;

const InputContainers = styled.div`
  display: flex;
  justify-content: center;
  height: 67px;
  width: 100%;
  gap: 8px;

  ${mediaBreakpointDown(Breakpoint.xTablet)} {
    height: 60px;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    height: 60px;
  }

`;

const RemainCodeInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SquareInput = styled.input`
  ${typography.body};
  width: 62px;
  height: 100%;
  padding: 0;
  text-align: center;
  border: 1px solid #d7d8de;
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 18px;
  color: ${Color.GRAY_800};
  transition: 0.2s border;

  ${mediaBreakpointDown(Breakpoint.xTablet)} {
    width: 59px;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    width: 59px;
  }

  &::placeholder {
    color: ${Color.GRAY_600};
    font-size: 13px;
  }

  &::-webkit-input-placeholder {
    color: ${Color.GRAY_600};
    font-size: 13px;
  }

  &:hover {
    border: 1px solid ${Color.GRAY_600};
  }

  &:not(:disabled):hover {
    border: 1px solid ${Color.GRAY_600};
  }

  &:focus {
    outline: none;
    border: 1px solid ${Color.GRAY_800};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const buttonStyles = css`
  width: 260px;

  ${mediaBreakpointDown(Breakpoint.xTablet)} {
    width: 190px;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    width: 156px;
  }
`;

const ResendContainer = styled.div`
  ${typography.body};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 32px;
`;
