import { styled } from '@/utils';

/**********************************************************************************/

type WeatherFeelsLikeProps = { feelslike: string };

const WeatherFeelsLikeStyle = styled('div')``;

/**********************************************************************************/

export default function WeatherText({ feelslike }: WeatherFeelsLikeProps) {
  return <WeatherFeelsLikeStyle>{feelslike}</WeatherFeelsLikeStyle>;
}
