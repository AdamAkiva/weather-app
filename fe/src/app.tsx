import styled from 'styled-components';

import sunnyImage from '@/assets/images/sunny.jpg';

const WeatherBackground = styled.div`
  font-size: 1.5rem;
  height: 100vh;
  padding: 5rem 5rem;
  overflow: auto;
  min-width: 800px;
`;

const WeatherStyle = styled.div`
  width: 100%;
  height: 100%;
  display: inline-grid;
  grid-template-rows: 3fr 1fr;
`;

const WeatherImageStyle = styled.div`
  min-width: 400px;
  background-image: url(${sunnyImage});
  background-repeat: no-repeat;
  background-size: cover;
`;

/**********************************************************************************/

function WeatherImage() {
  return <WeatherImageStyle></WeatherImageStyle>;
}

function WeatherInfo() {
  return <div>Bamba</div>;
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
