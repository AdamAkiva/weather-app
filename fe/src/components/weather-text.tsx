import { styled } from '@/utils';

/**********************************************************************************/

const WeatherTextStyle = styled.div`
  margin-top: 1.33em;
  font-size: 1.66em;
  text-align: center;
`;

/**********************************************************************************/

type WeatherTextProps = { temperature: string };

/**********************************************************************************/

export default function WeatherText({ temperature }: WeatherTextProps) {
  return <WeatherTextStyle>{temperature}</WeatherTextStyle>;
}
