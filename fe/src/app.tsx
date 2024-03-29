import { Loading, WeatherImage, WeatherText } from '@/components';
import { styled, useEffect, useState } from '@/utils';
import { fetchWeather } from '@/weather';

/**********************************************************************************/

type WeatherState = Awaited<ReturnType<typeof fetchWeather>>;

const WeatherStyle = styled('div')`
  display: flex;
  flex-flow: column wrap;
  gap: 1em;
`;

/**********************************************************************************/

export default function App() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherState>({
    location: '',
    temperature: '',
    feelsLike: '',
    image: ''
  });

  useEffect(() => {
    async function setInitialWeather() {
      setWeather(await fetchWeather());
      setLoading(false);
    }

    setInitialWeather();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <WeatherStyle>
      <WeatherImage image={weather.image}></WeatherImage>
      <WeatherText
        location={weather.location}
        temperature={weather.temperature}
        feelsLike={weather.feelsLike}
      ></WeatherText>
    </WeatherStyle>
  );
}
