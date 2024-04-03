import type { ForecastState, WeatherState } from './view.ts';

/**********************************************************************************/

export const weatherInitialValue: WeatherState = {
  result: {
    location: '',
    temperature: '',
    feelsLike: '',
    image: { url: '', desc: '' }
  },
  lastUpdate: 0,
  currTime: new Date()
};

export const forecastInitialValue: ForecastState = {
  result: {
    location: '',
    temperature: []
  },
  lastUpdate: 0,
  currTime: new Date()
};
