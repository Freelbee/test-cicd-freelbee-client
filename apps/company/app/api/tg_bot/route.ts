import { TelegramBot } from "./TelegramBot";

export async function POST (request: Request) {
    const message: string = await request.json();

    const bot = new TelegramBot(process.env.NEXT_PUBLIC_BOT_TOKEN ?? '', process.env.NEXT_PUBLIC_TG_CHANNEL_ID ?? '');
    const res = await bot.sendMessageToChannel(message);
    return Response.json(res); 
}