import { useEffect, useRef } from 'react';
import { TelegramUser } from '@admin/entities';

type Props = {
  callback: (user: TelegramUser) => void
}

export function TelegramOauth(props: Props) {
  const { callback } = props;

  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //@ts-expect-error
    window.handleTelegramCallback = callback;
    const script = document.createElement('script');

    script.src = 'https://telegram.org/js/telegram-widget.js?21';
    script.setAttribute('data-telegram-login', process.env.NEXT_PUBLIC_BOT_URL ?? 'FreelbeeAdminTest1Bot'); //TODO::: change bot
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
  // <script async src="https://telegram.org/js/telegram-widget.js?21" data-telegram-login="samplebot" data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script>
  // <script type="text/javascript">
  //     function onTelegramAuth(user) {
  //     alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
  // }
  // </script>

  return (
    <div className={``} ref={buttonRef} />
  );
}
