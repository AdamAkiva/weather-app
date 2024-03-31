import {
  ErrorComponent,
  LoadingComponent,
  WeatherButton,
  WeatherImage,
  WeatherText
} from '@/components';
import {
  WeatherAppError,
  styled,
  useEffect,
  useState,
  type SetState,
  type Views
} from '@/utils';
import { fetchWeather } from '@/weather';

/**********************************************************************************/

type WeatherState = Awaited<ReturnType<typeof fetchWeather>>;

const WeatherStyle = styled('div')`
  display: flex;
  flex-flow: column wrap;
  gap: 1em;
`;

function setOnClickHandler(view: Views, setView: SetState<Views>) {
  switch (view) {
    case 'day':
      return setView('week');
    case 'week':
      return setView('day');
    default:
      return setView('day');
  }
}

/**********************************************************************************/

export default function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<Views>('day');
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
    return <LoadingComponent></LoadingComponent>;
  }

  if (errMsg) {
    return <ErrorComponent errMsg={errMsg}></ErrorComponent>;
  }

  if (view === 'day') {
    return (
      <WeatherStyle>
        <WeatherImage image={weather.image}></WeatherImage>
        <WeatherText
          location={weather.location}
          temperature={weather.temperature}
          feelsLike={weather.feelsLike}
        ></WeatherText>
        <WeatherButton
          text="Week"
          onClickCb={() => {
            setOnClickHandler(view, setView);
          }}
        ></WeatherButton>
      </WeatherStyle>
    );
  }

  // TODO Create the weekly view of the weather
  return (
    <WeatherStyle>
      <WeatherButton
        text="Day"
        onClickCb={() => {
          setOnClickHandler(view, setView);
        }}
      ></WeatherButton>
    </WeatherStyle>
  );
}
