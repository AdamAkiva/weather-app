import { styled } from '@/utils';

/**********************************************************************************/

const WeatherImageStyle = styled('div')<WeatherImageProps>`
  min-height: 50vh;
  min-width: 45vw;
  background-image: ${({ image }) => {
    return `url(${image})`;
  }};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 5em auto 2em auto;
`;

/**********************************************************************************/

type WeatherImageProps = { image: string };

/**********************************************************************************/

export default function WeatherImage({ image }: WeatherImageProps) {
  return <WeatherImageStyle image={image}></WeatherImageStyle>;
}
