import { styled } from '@/utils';

import WeatherFeelsLike from './weather-feelslike.tsx';
import WeatherLocation from './weather-location.tsx';
import WeatherTemperature from './weather-temperature.tsx';

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

/**********************************************************************************/

export default function WeatherText({
  location,
  temperature,
  feelsLike
}: WeatherTextProps) {
  return (
    <WeatherTextStyle>
      <WeatherLocation location={location}></WeatherLocation>
      <WeatherTemperature temperature={temperature}></WeatherTemperature>
      <WeatherFeelsLike feelslike={feelsLike}></WeatherFeelsLike>
    </WeatherTextStyle>
  );
}
