import { styled } from '@/utils';

import sunnyImage from '@/assets/images/sunny.jpg';

/**********************************************************************************/

const WeatherImageStyle = styled.div`
  min-height: 50vh;
  min-width: 45vw;
  background-image: url(${sunnyImage});
  background-size: cover;
  background-repeat: no-repeat;
  margin: 5em auto;
`;

/**********************************************************************************/

export default function WeatherImage() {
  return <WeatherImageStyle></WeatherImageStyle>;
}
