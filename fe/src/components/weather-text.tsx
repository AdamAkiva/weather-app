import { styled } from '@/utils';

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
  return (
    <WeatherTextStyle>
      <WeatherLocationStyle>{location}</WeatherLocationStyle>
      <WeatherTemperatureStyle>{temperature}</WeatherTemperatureStyle>
      <WeatherFeelsLikeStyle>{feelsLike}</WeatherFeelsLikeStyle>
    </WeatherTextStyle>
  );
}
