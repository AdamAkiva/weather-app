import { styled } from '@/utils';

/**********************************************************************************/

type WeatherLocationProps = { location: string };

const WeatherLocationStyle = styled('div')`
  margin-bottom: 0.25em;
  font-size: 1.55em;
`;

/**********************************************************************************/

export default function WeatherText({ location }: WeatherLocationProps) {
  return <WeatherLocationStyle>{location}</WeatherLocationStyle>;
}
