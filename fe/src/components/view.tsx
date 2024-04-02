import {
  ErrorComponent,
  LoadingComponent,
  WeatherButton,
  WeatherImage,
  WeatherText
} from '@/components';
import { styled, useEffect, useState, type Views } from '@/utils';

import {
  setDailyWeather,
  setOnClickHandler,
  setWeeklyForecast,
  type ForecastState,
  type WeatherState
} from './api/index.ts';
import { forecastInitialValue, weatherInitialValue } from './utils/index.ts';

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
            setOnClickHandler(view, setView);
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
          setOnClickHandler(view, setView);
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
