import clearImage from '@/assets/images/clear.jpg';
import mistImage from '@/assets/images/mist.jpg';
import partlyCloudyImage from '@/assets/images/partly-cloudy.jpg';
import rainyImage from '@/assets/images/rainy.jpg';
import sunnyImage from '@/assets/images/sunny.jpg';
import unknownWeatherStatusImage from '@/assets/images/unknown.jpg';

import { getEnvValue, httpInstance, uppercaseFirstLetter } from '@/utils';

import {
  geoLocationErrorHandler,
  getGeoLocation,
  weatherAPIErrorHandler
} from './utils.ts';

/**********************************************************************************/

// There are many more fields, to see all of the see this:
// https://app.swaggerhub.com/apis-docs/WeatherAPI.com/WeatherAPI/1.0.2#/APIs/realtime-weather
// under `/current.json`
type WeatherAPIResult = {
  current: {
    temp_c: number;
    humidity: number;
    feelslike_c: number;
    condition: {
      text: string;
    };
    last_updated_epoch: number;
  };
  location: {
    country: string;
    name: string;
  };
};

// There are many more fields, to see all of the see this:
// https://app.swaggerhub.com/apis-docs/WeatherAPI.com/WeatherAPI/1.0.2#/APIs/realtime-weather
// under `/forecast.json`
type ForecastAPIResult = WeatherAPIResult & {
  forecast: {
    forecastday: {
      day: {
        avghumidity: number;
        avgtemp_c: number;
        condition: { text: string };
      };
    }[];
  };
};

const knownWeatherStatuses = new Map([
  ['sunny', sunnyImage],
  ['rainy', rainyImage],
  ['clear', clearImage],
  ['partly cloudy', partlyCloudyImage],
  ['mist', mistImage]
]);

/**********************************************************************************/

export async function fetchWeather() {
  const API_URL = getEnvValue('API_URL');
  const API_KEY = getEnvValue('API_KEY');

  const { lat, long } = await getGeoLocation().catch(geoLocationErrorHandler);
  const weatherResult = await httpInstance
    .get<WeatherAPIResult>(
      `${API_URL}/current.json?key=${API_KEY}&q=${lat},${long}&aqi=no`
    )
    .catch(weatherAPIErrorHandler);

  return {
    result: formatWeatherResult(weatherResult),
    lastUpdate: weatherResult.current.last_updated_epoch,
    currTime: new Date()
  };
}

export async function fetchForecast() {
  const API_URL = getEnvValue('API_URL');
  const API_KEY = getEnvValue('API_KEY');

  const { lat, long } = await getGeoLocation().catch(geoLocationErrorHandler);
  const forecastResult = await httpInstance
    .get<ForecastAPIResult>(
      `${API_URL}/forecast.json?key=${API_KEY}&q=${lat},${long}&days=3&alerts=no&aqi=no`
    )
    .catch(weatherAPIErrorHandler);

  return {
    result: formatForecastResult(forecastResult),
    lastUpdate: forecastResult.current.last_updated_epoch,
    currTime: new Date()
  };
}

/**********************************************************************************/

function formatWeatherResult(weatherResult: WeatherAPIResult) {
  const { location, current } = weatherResult;

  const locationDesc = `${uppercaseFirstLetter(location.name)} ${uppercaseFirstLetter(location.country)}`;
  const temperatureDesc = `It is currently ${current.temp_c}°C with ${current.humidity}% humidity`;
  const feelsLikeDesc = `It feels like ${current.feelslike_c}°C`;

  const weatherImageDesc = weatherResult.current.condition.text.toLowerCase();
  let weatherImage = knownWeatherStatuses.get(weatherImageDesc);
  if (!weatherImage) {
    console.error(`Unknown weather status: ${weatherImageDesc}`);

    weatherImage = unknownWeatherStatusImage;
  }

  return {
    location: locationDesc,
    temperature: temperatureDesc,
    feelsLike: feelsLikeDesc,
    image: { url: weatherImage, desc: weatherImageDesc }
  };
}

function formatForecastResult(forecastResult: ForecastAPIResult) {
  const { location, forecast } = forecastResult;

  const locationDesc = `${uppercaseFirstLetter(location.name)} ${uppercaseFirstLetter(location.country)}`;
  const temperatureDesc = forecast.forecastday.map(({ day }) => {
    const weatherImageDesc = day.condition.text.toLowerCase();
    let weatherImage = knownWeatherStatuses.get(weatherImageDesc);
    if (!weatherImage) {
      console.error(`Unknown weather status: ${weatherImageDesc}`);

      weatherImage = unknownWeatherStatusImage;
    }

    return {
      temperature: day.avgtemp_c,
      humidity: day.avghumidity,
      image: { url: weatherImage, desc: weatherImageDesc }
    };
  });

  return {
    location: locationDesc,
    temperature: temperatureDesc
  };
}
