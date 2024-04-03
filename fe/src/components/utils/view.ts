import { WeatherAppError, type SetState, type Views } from '@/utils';
import { fetchForecast, fetchWeather } from '@/weather';

import { HOUR_IN_SECONDS } from './constants.ts';

/**********************************************************************************/

export type WeatherState = Awaited<ReturnType<typeof fetchWeather>>;
export type ForecastState = Awaited<ReturnType<typeof fetchForecast>>;

/**********************************************************************************/

export function weatherButtonOnClickEventHandler(
  view: Views,
  setView: SetState<Views>
) {
  switch (view) {
    case 'day':
      return setView('week');
    case 'week':
      return setView('day');
    default:
      return setView('day');
  }
}

export async function setDailyWeather(params: {
  weather: WeatherState;
  setLoading: SetState<boolean>;
  setWeather: SetState<WeatherState>;
  setErrMsg: SetState<string>;
}) {
  const { weather, setLoading, setWeather, setErrMsg } = params;

  try {
    setLoading(true);
    if (!checkIfEnoughTimePassed(weather.lastUpdate)) {
      return setWeather({ ...weather, currTime: new Date() });
    }

    setWeather(await fetchWeather());
  } catch (err) {
    console.error(err);
    if (err instanceof WeatherAppError) {
      setErrMsg(err.message);
    } else {
      setErrMsg('Unknown error, please try again later');
    }
  } finally {
    setLoading(false);
  }
}

export async function setWeeklyForecast(params: {
  forecast: ForecastState;
  setLoading: SetState<boolean>;
  setForecast: SetState<ForecastState>;
  setErrMsg: SetState<string>;
}) {
  const { forecast, setLoading, setForecast, setErrMsg } = params;

  try {
    setLoading(true);
    if (!checkIfEnoughTimePassed(forecast.lastUpdate)) {
      return setForecast({ ...forecast, currTime: new Date() });
    }

    setForecast(await fetchForecast());
  } catch (err) {
    console.error(err);
    if (err instanceof WeatherAppError) {
      setErrMsg(err.message);
    } else {
      setErrMsg('Unknown error, please try again later');
    }
  } finally {
    setLoading(false);
  }
}

/**********************************************************************************/

function checkIfEnoughTimePassed(apiCallTime: number) {
  // Convert millis since epoch to seconds since epoch
  const secondsSinceEpoch = Math.round(Date.now() / 1000);

  return secondsSinceEpoch - apiCallTime >= HOUR_IN_SECONDS;
}
