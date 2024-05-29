import { Context } from "telegraf"
import { logger } from '../logger/loggerPino'
import { replyMarkup } from "../types/keyboard"
import { apiKey } from '../config'
import axios from 'axios'

interface DateType {
    month: string,
    day: number,
    hours: number,
}

interface GeoType {
    latCity: number,
    lonCity: number,
}

export class OpenWeatherClient {
    async getGeoCity(cityName: string): Promise<GeoType | null> {
        try {
            const countryCode: string = `ISO 3166`
            const geoUrl: string = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=${1}&appid=${apiKey}`
            const response = await axios.get(geoUrl)
            const latCity = response.data[0].lat
            const lonCity = response.data[0].lon
            return {
                latCity,
                lonCity
            }
        } catch (err) {
            logger.info(err)
            return null
        }
    }
    async getWeatherData(cityName: string): Promise<any> {
        try {
            const geoDataCity = await this.getGeoCity(cityName)
            const apiCall: string = `https://api.openweathermap.org/data/2.5/forecast?lat=${geoDataCity?.latCity}&lon=${geoDataCity?.lonCity}&cnt=3&appid=${apiKey}&units=metric`
            const response = await axios.get(apiCall)
            return response.data
        } catch (err) {
            logger.info(err)
        }

    }
    async getDate(unixDate: number): Promise<DateType | null> {
        try {
            const date = new Date(unixDate * 1000)
            const month = new Intl.DateTimeFormat(`en`, { month: `long` }).format(date)
            const day = date.getDate()
            const hours = date.getHours()
            return {
                month,
                day,
                hours,
            }
        } catch (err) {
            logger.info(err)
            return null
        }
    }
    async getWeatherForecast(ctx: Context, cityName: string): Promise<void> {
        try {
            const response = await this.getWeatherData(cityName)
            const length = response.list.length
            const arrayForecastWeather: string[] = []

            for (let i = 0; i < length; i++) {
                const date = await this.getDate(response.list[i].dt)
                if (date !== null) {
                    const hours: number = date.hours
                    const day: number = date.day
                    const month: string = date.month
                    const temperature: number = Math.round(response.list[i].main.temp)
                    arrayForecastWeather.push(`${day} of ${month} at ${hours}:00 *${temperature}* °C`)
                }
            }

            const message: string = arrayForecastWeather.join('\n')
            await ctx.replyWithMarkdownV2(`Forecast for _${cityName}_`)
            ctx.replyWithMarkdownV2(message, replyMarkup)
            logger.info(`Execute ${cityName} command`)
        } catch (err) {
            logger.info(err)
            ctx.replyWithMarkdownV2(`_${cityName}_ not correct`, replyMarkup)
        }
    }
}