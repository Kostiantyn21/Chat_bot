import { Context } from 'telegraf'
import { OpenWeatherClient } from '../clients/clientsCommands'
import { logger } from '../logger/loggerPino'

export class WeatherCommand {
    private cityName: string
    constructor(
        cityName: string
    ) {
        this.cityName = cityName
    }
    async execute(ctx: Context): Promise<void> {
        try {
            const response = new OpenWeatherClient().getWeatherForecast(ctx, this.cityName)
            return response
        } catch (err) {
            logger.info(err)
        }
    }
}