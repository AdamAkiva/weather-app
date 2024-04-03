import type { ForecastState, WeatherState } from './view.ts';

/**********************************************************************************/

export const weatherInitialValue: WeatherState = {
  result: {
    location: '',
    temperature: '',
    feelsLike: '',
    image: ''
  },
  lastUpdate: 0,
  currTime: 0
};

export const forecastInitialValue: ForecastState = {
  result: {
    location: '',
    temperature: []
  },
  lastUpdate: 0,
  currTime: 0
};
