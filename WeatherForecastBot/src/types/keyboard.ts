const keyboard: { text: string }[][] = [
    [{ text: 'Berlin' }, { text: 'London' }, { text: 'Kyiv' }, { text: 'Oslo' },],
    [{ text: 'Kongo' }, { text: 'Tokio' }, { text: 'Hong Kong' }, { text: 'Helsinki' },]
]

interface ReplyMarkup {
    reply_markup: {
        keyboard: { text: string }[][],
        resize_keyboard: boolean,
        one_time_keyboard: boolean,
    }
}

export const replyMarkup: ReplyMarkup = {
    reply_markup: {
        keyboard: keyboard,
        resize_keyboard: true,
        one_time_keyboard: true
    }
}