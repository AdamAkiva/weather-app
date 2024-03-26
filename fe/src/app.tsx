import { WeatherImage, WeatherText } from '@/components';
import { styled, useEffect, useState } from '@/utils';
import { fetchWeather } from '@/weather';

/**********************************************************************************/

const WeatherStyle = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 1em;
`;

/**********************************************************************************/

export default function App() {
  const [weather, setWeather] = useState({ temperature: '0', image: '' });

  useEffect(() => {
    async function setInitialWeather() {
      setWeather(await fetchWeather());
    }

    setInitialWeather();
  }, []);

  return (
    <WeatherStyle>
      <WeatherImage image={weather.image}></WeatherImage>
      <WeatherText temperature={weather.temperature}></WeatherText>
    </WeatherStyle>
  );
}
