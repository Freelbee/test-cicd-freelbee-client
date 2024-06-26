import { useEffect, useRef } from 'react';
import { TelegramUser } from '@admin/entities';

type Props = {
  callback: (user: TelegramUser) => void
}

export function TelegramOauth(props: Props) {
  const { callback } = props;

  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.handleTelegramCallback = callback;
    const script = document.createElement('script');

    script.src = 'https://telegram.org/js/telegram-widget.js?21';
    script.setAttribute('data-telegram-login', process.env.NEXT_PUBLIC_BOT_URL ?? 'FreelbeeAdminTest1Bot');
    script.setAttribute('data-size', `large`);
    script.setAttribute('data-request-access', `write`);
    script.setAttribute('data-userpic', `false`);
    script.setAttribute('data-onauth', `handleTelegramCallback(user)`);
    script.async = true;

    const element = buttonRef.current;
    element?.appendChild(script);

    return () => {
      element?.removeChild(script);
    };
  }, []);

  return (
    <div className={``} ref={buttonRef} />
  );
}
