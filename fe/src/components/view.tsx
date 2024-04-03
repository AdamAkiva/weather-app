import { styled, useEffect, useState, type Views } from '@/utils';

import ErrorComponent from './error.tsx';
import LoadingComponent from './loading.tsx';
import {
  forecastInitialValue,
  setDailyWeather,
  setWeeklyForecast,
  weatherButtonOnClickEventHandler,
  weatherInitialValue,
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
  const [loading, setLoading] = useState<boolean>(true);
  const [view, setView] = useState<Views>('day');
  const [errMsg, setErrMsg] = useState<string>('');
  const [weather, setWeather] = useState<WeatherState>(weatherInitialValue);
  const [forecast, setForecast] = useState<ForecastState>(forecastInitialValue);

  useEffect(() => {
    async function setInitialWeather() {
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

    setInitialWeather();
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
        <WeatherImage image={weather.result.image}></WeatherImage>
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
