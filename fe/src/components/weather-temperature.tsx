import { styled } from '@/utils';

/**********************************************************************************/

type WeatherTemperatureProps = { temperature: string };

const WeatherTemperatureStyle = styled('div')`
  margin-bottom: 0.33em;
`;

/**********************************************************************************/

export default function WeatherText({ temperature }: WeatherTemperatureProps) {
  return <WeatherTemperatureStyle>{temperature}</WeatherTemperatureStyle>;
}
