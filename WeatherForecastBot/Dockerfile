FROM node:alpine

COPY . /WeatherForecastBot/

WORKDIR /WeatherForecastBot/dist

EXPOSE 3000

RUN npm install

CMD ["node", "/WeatherForecastBot/dist/app.js"]
