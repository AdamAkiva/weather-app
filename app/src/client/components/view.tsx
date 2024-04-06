import { styled, useEffect, useState, type Views } from '../utils/index.ts';

import ErrorComponent from './error.tsx';
import LoadingComponent from './loading.tsx';
import {
  FORECAST_INITIAL_VALUE,
  setDailyWeather,
  setWeeklyForecast,
  TWENTY_MINUTES_IN_MILLIS,
  WEATHER_INITIAL_VALUE,
  weatherButtonOnClickEventHandler,
  type ForecastState,
  type WeatherState
} from './utils/index.ts';
import WeatherButton from './weather-button.tsx';
import WeatherImage from './weather-image.tsx';
import WeatherText from './weather-text.tsx';

/**********************************************************************************/

const WeatherStyle = styled('div')`
  display: flex;
  flex-flow: column wrap;
  gap: 1em;
`;

/**********************************************************************************/

export default function View() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<Views>('day');
  const [errMsg, setErrMsg] = useState('');
  const [weather, setWeather] = useState<WeatherState>(WEATHER_INITIAL_VALUE);
  const [forecast, setForecast] = useState<ForecastState>(
    FORECAST_INITIAL_VALUE
  );

  useEffect(() => {
    async function fetchWeatherStatus() {
      await Promise.all([
        setDailyWeather({
          weather: weather,
          setLoading: setLoading,
          setWeather: setWeather,
          setErrMsg: setErrMsg
        }),
        setWeeklyForecast({
          forecast: forecast,
          setLoading: setLoading,
          setForecast: setForecast,
          setErrMsg: setErrMsg
        })
      ]);
    }

    fetchWeatherStatus();

    const interval = setInterval(() => {
      fetchWeatherStatus();
    }, TWENTY_MINUTES_IN_MILLIS);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <LoadingComponent></LoadingComponent>;
  }

  if (errMsg) {
    return <ErrorComponent errMsg={errMsg}></ErrorComponent>;
  }

  if (view === 'day') {
    return (
      <WeatherStyle>
        <WeatherImage
          imageUrl={weather.result.image.url}
          imageDesc={weather.result.image.desc}
        ></WeatherImage>
        <WeatherText
          location={weather.result.location}
          temperature={weather.result.temperature}
          feelsLike={weather.result.feelsLike}
        ></WeatherText>
        <WeatherButton
          text="Week"
          onClickCb={() => {
            weatherButtonOnClickEventHandler(view, setView);
            setWeeklyForecast({
              forecast: forecast,
              setLoading: setLoading,
              setForecast: setForecast,
              setErrMsg: setErrMsg
            });
          }}
        ></WeatherButton>
      </WeatherStyle>
    );
  }

  return (
    <WeatherStyle>
      <WeatherButton
        text="Day"
        onClickCb={() => {
          weatherButtonOnClickEventHandler(view, setView);
          setDailyWeather({
            weather: weather,
            setLoading: setLoading,
            setWeather: setWeather,
            setErrMsg: setErrMsg
          });
        }}
      ></WeatherButton>
    </WeatherStyle>
  );
}
