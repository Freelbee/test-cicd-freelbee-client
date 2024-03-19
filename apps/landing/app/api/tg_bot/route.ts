import { MessageBuilder } from "./_util/MessageBuilder";
import { TelegramBot } from "./_util/TelegramBot";

export async function POST (request: Request) {
    const message: ApplicationMessage = await request.json();

    const messageText = MessageBuilder.builder()
        .title(`New message from ${message.email}`)
        .body(message.message)
        .phone(message?.phone)
        .env(process.env.NEXT_PUBLIC_MODE)
        .target(message?.target)
        .build();

    const bot = new TelegramBot(process.env.NEXT_PUBLIC_BOT_TOKEN ?? '', process.env.NEXT_PUBLIC_TG_CHANNEL_ID ?? '');
    const res = await bot.sendMessageToChannel(messageText);
    return Response.json(res);
}

interface ApplicationMessage {
    email: string,
    message: string,
    phone?: string,
    target?: string,
}
