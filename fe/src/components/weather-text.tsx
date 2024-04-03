import { formatTime, styled, useEffect, useState } from '@/utils';

import { SECOND_IN_MILLIS } from './utils/index.ts';

/**********************************************************************************/

type WeatherTextProps = {
  location: string;
  temperature: string;
  feelsLike: string;
};

const WeatherTextStyle = styled('div')`
  display: flex;
  flex-flow: column wrap;
  font-size: 1.5em;
  text-align: center;
`;

const WeatherLocationStyle = styled('div')`
  margin-bottom: 0.25em;
  font-size: 1.55em;
`;

const WeatherTemperatureStyle = styled('div')`
  margin-bottom: 0.33em;
`;

const WeatherFeelsLikeStyle = styled('div')``;

/**********************************************************************************/

export default function WeatherText({
  location,
  temperature,
  feelsLike
}: WeatherTextProps) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, SECOND_IN_MILLIS);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <WeatherTextStyle>
      <WeatherLocationStyle>{`${location} - ${formatTime(date)}`}</WeatherLocationStyle>
      <WeatherTemperatureStyle>{temperature}</WeatherTemperatureStyle>
      <WeatherFeelsLikeStyle>{feelsLike}</WeatherFeelsLikeStyle>
    </WeatherTextStyle>
  );
}
