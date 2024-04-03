import type { ForecastState, WeatherState } from './view.ts';

/**********************************************************************************/

export const WEATHER_INITIAL_VALUE: WeatherState = {
  result: {
    location: '',
    temperature: '',
    feelsLike: '',
    image: { url: '', desc: '' }
  },
  lastUpdate: 0,
  currTime: new Date()
};

export const FORECAST_INITIAL_VALUE: ForecastState = {
  result: {
    location: '',
    temperature: []
  },
  lastUpdate: 0,
  currTime: new Date()
};

export const SECOND_IN_MILLIS = 1_000;

export const TWENTY_MINUTES_IN_MILLIS = SECOND_IN_MILLIS * 60 * 20;
