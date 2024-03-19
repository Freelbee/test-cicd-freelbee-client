'use client';

import {Main} from '@landing/pages';
import { useEffect } from 'react';
import * as process from 'process';

export default function Home () {

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_TG_CHANNEL_ID)
    console.log(process.env.NEXT_PUBLIC_PERSONAL_URL)
    console.log(process.env.NEXT_PUBLIC_MODE)
    console.log(process.env.NEXT_PUBLIC_EMAIL)
    console.log(process.env.NEXT_PUBLIC_BOT_TOKEN)
    console.log(process.env.NEXT_TEST_GIT_TOKEN)
    console.log("YOU ARE GAY")
  }, []);

    return (
        <Main />
    );
}
