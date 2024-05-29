import { Telegraf } from "telegraf"
import { token } from './config'
import { replyMarkup } from './types/keyboard'
import { WeatherCommand } from "./commands/bot_command"

const bot = new Telegraf(token)

bot.launch()

bot.start((ctx) => ctx.reply(`Welcome dear!`, replyMarkup))

bot.on('text', async (ctx) => {
    const message = ctx.message.text
    new WeatherCommand(message).execute(ctx)
})