import clearImage from '@/assets/images/clear.jpg';
import rainyImage from '@/assets/images/rainy.jpg';
import sunnyImage from '@/assets/images/sunny.jpg';
import unknownWeatherStatusImage from '@/assets/images/unknown.jpg';

import { getEnvValue, uppercaseFirstLetter } from '@/utils';

import { httpInstance } from './http.ts';
import {
  geoLocationErrorHandler,
  geoLocationWrapper,
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
  ['clear', clearImage]
]);

/**********************************************************************************/

export async function fetchWeather() {
  const API_URL = getEnvValue('API_URL');
  const API_KEY = getEnvValue('API_KEY');

  const { lat, long } = await geoLocationWrapper().catch(
    geoLocationErrorHandler
  );
  const weatherResult = await httpInstance
    .get<WeatherAPIResult>(
      `${API_URL}/current.json?key=${API_KEY}&q=${lat},${long}&aqi=no`
    )
    .catch(weatherAPIErrorHandler);

  return {
    result: formatWeatherResult(weatherResult),
    lastUpdate: weatherResult.current.last_updated_epoch,
    currTime: Date.now()
  };
}

export async function fetchForecast() {
  const API_URL = getEnvValue('API_URL');
  const API_KEY = getEnvValue('API_KEY');

  const { lat, long } = await geoLocationWrapper().catch(
    geoLocationErrorHandler
  );
  const forecastResult = await httpInstance
    .get<ForecastAPIResult>(
      `${API_URL}/forecast.json?key=${API_KEY}&q=${lat},${long}&days=3&alerts=no&aqi=no`
    )
    .catch(weatherAPIErrorHandler);

  return {
    result: formatForecastResult(forecastResult),
    lastUpdate: forecastResult.current.last_updated_epoch,
    currTime: Date.now()
  };
}

/**********************************************************************************/

function formatWeatherResult(weatherResult: WeatherAPIResult) {
  const { location, current } = weatherResult;

  const locationDesc = `${uppercaseFirstLetter(location.name)} ${uppercaseFirstLetter(location.country)}`;
  const temperatureDesc = `It is currently ${current.temp_c}°C with ${current.humidity}% humidity`;
  const feelsLikeDesc = `It feels like ${current.feelslike_c}°C`;

  let weatherImage = knownWeatherStatuses.get(
    weatherResult.current.condition.text.toLowerCase()
  );
  if (!weatherImage) {
    console.error(
      `Unknown weather status: ${weatherResult.current.condition.text}`
    );

    weatherImage = unknownWeatherStatusImage;
  }

  return {
    location: locationDesc,
    temperature: temperatureDesc,
    feelsLike: feelsLikeDesc,
    image: weatherImage
  };
}

function formatForecastResult(forecastResult: ForecastAPIResult) {
  const { location, forecast } = forecastResult;

  const locationDesc = `${uppercaseFirstLetter(location.name)} ${uppercaseFirstLetter(location.country)}`;
  const temperatureDesc = forecast.forecastday.map(({ day }) => {
    let weatherImage = knownWeatherStatuses.get(
      day.condition.text.toLowerCase()
    );
    if (!weatherImage) {
      console.error(`Unknown weather status: ${day.condition.text}`);

      weatherImage = unknownWeatherStatusImage;
    }

    return {
      temperature: day.avgtemp_c,
      humidity: day.avghumidity,
      image: weatherImage
    };
  });

  return {
    location: locationDesc,
    temperature: temperatureDesc
  };
}
