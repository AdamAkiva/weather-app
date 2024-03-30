import {
  ErrorComponent,
  Loading,
  WeatherImage,
  WeatherText
} from '@/components';
import { WeatherAppError, styled, useEffect, useState } from '@/utils';
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
  const [errMsg, setErrMsg] = useState<string>(null!);
  const [weather, setWeather] = useState<WeatherState>({
    location: '',
    temperature: '',
    feelsLike: '',
    image: ''
  });

  useEffect(() => {
    async function setInitialWeather() {
      try {
        setWeather(await fetchWeather());
      } catch (err) {
        if (err instanceof WeatherAppError) {
          setErrMsg(err.message);
        } else {
          setErrMsg('Unknown error, please try again later');
        }
      } finally {
        setLoading(false);
      }
    }

    setInitialWeather();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  if (errMsg) {
    return <ErrorComponent errMsg={errMsg}></ErrorComponent>;
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
