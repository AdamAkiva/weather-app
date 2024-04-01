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
  };
  location: {
    country: string;
    name: string;
    localtime_epoch: number;
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
    secondsSinceEpoch: weatherResult.location.localtime_epoch
  };
}

/**********************************************************************************/

function formatWeatherResult(weatherResult: WeatherAPIResult) {
  const { location, current } = weatherResult;

  const locationDesc = `${uppercaseFirstLetter(location.name)} ${uppercaseFirstLetter(location.country)} - ${formatTime(location.localtime_epoch)}`;
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

function formatTime(timeSinceEpoch: number) {
  const time = new Date(timeSinceEpoch * 1000);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}
`;
}
