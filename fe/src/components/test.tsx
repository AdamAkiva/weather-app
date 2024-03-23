// TODO This is used for testing all components in a single file.
// Should be removed after we're done

import { styled } from '@/utils';

import sunnyImage from '@/assets/images/sunny.jpg';

/**********************************************************************************/

const WeatherStyle = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 2em;
`;

const WeatherImage = styled.div`
  min-height: 50vh;
  min-width: 45vw;
  background-image: url(${sunnyImage});
  background-size: cover;
  background-repeat: no-repeat;
  margin: 5em auto;
`;

const WeatherText = styled.div`
  margin-top: 1.33em;
  font-size: 1.66em;
  text-align: center;
`;

/**********************************************************************************/

function WeatherInfo() {
  return <WeatherText>Placeholder</WeatherText>;
}

export default function App() {
  return (
    <WeatherStyle>
      <WeatherImage></WeatherImage>
      <WeatherInfo></WeatherInfo>
    </WeatherStyle>
  );
}
