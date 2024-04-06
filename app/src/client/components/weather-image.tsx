import { styled, uppercaseFirstLetter } from '../utils';

/**********************************************************************************/

const WeatherImageStyle = styled('div')<Pick<WeatherImageProps, 'imageUrl'>>`
  min-height: 50vh;
  min-width: 45vw;
  background-image: ${({ imageUrl }) => {
    return `url(${imageUrl})`;
  }};
  background-size: cover;
  background-repeat: no-repeat;
  margin: 5em auto 2em auto;
`;

/**********************************************************************************/

type WeatherImageProps = { imageUrl: string; imageDesc: string };

/**********************************************************************************/

export default function WeatherImage({
  imageUrl,
  imageDesc
}: WeatherImageProps) {
  return (
    <WeatherImageStyle
      imageUrl={imageUrl}
      title={uppercaseFirstLetter(imageDesc)}
    ></WeatherImageStyle>
  );
}
