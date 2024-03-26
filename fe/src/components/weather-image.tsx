import { styled } from '@/utils';

import rainyImage from '@/assets/images/rainy.jpg';
import sunnyImage from '@/assets/images/sunny.jpg';
import windyImage from '@/assets/images/windy.jpg';

sunnyImage;
windyImage;
rainyImage;

/**********************************************************************************/

const WeatherImageStyle = styled.div`
  min-height: 50vh;
  min-width: 45vw;
  background-image: url(${windyImage});
  background-size: cover;
  background-repeat: no-repeat;
  margin: 5em auto 2em auto;
`;

/**********************************************************************************/

export default function WeatherImage() {
  return <WeatherImageStyle></WeatherImageStyle>;
}
