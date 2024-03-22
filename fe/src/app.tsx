import styled from 'styled-components';

import sunnyImage from '@/assets/images/sunny.jpg';

const WeatherBackground = styled.div`
  width: 100vw;
  height: 100vh;
`;

const WeatherStyle = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 2em;
`;

const WeatherImageStyle = styled.div`
  min-height: 50vh;
  background-image: url(${sunnyImage});
  background-repeat: no-repeat;
  background-size: contain;
`;

const WeatherText = styled.div`
  margin-top: 1.33em;
  font-size: 1.66em;
  text-align: center;
`;

/**********************************************************************************/

function WeatherImage() {
  return <WeatherImageStyle></WeatherImageStyle>;
}

function WeatherInfo() {
  return <WeatherText>Bamba</WeatherText>;
}

export default function App() {
  return (
    <WeatherBackground>
      <WeatherStyle>
        <WeatherImage></WeatherImage>
        <WeatherInfo></WeatherInfo>
      </WeatherStyle>
    </WeatherBackground>
  );
}
