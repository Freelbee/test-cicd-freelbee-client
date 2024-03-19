import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/types";

export class TelegramBot {
    bot: Telegraf<Context<Update>>;
    channelID: string;

    constructor (token: string, channelId?: string) {
        this.bot = new Telegraf(token);
        this.channelID = channelId ?? '';
    }

    public async sendMessageToChannel (msg: string) {
        const res = await this.bot.telegram.sendMessage(this.channelID, msg, {
            parse_mode: 'HTML'
        });
        return res;
    }
}