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

async function setDailyWeather(params: {
  weather: WeatherState;
  setLoading: SetState<boolean>;
  setWeather: SetState<WeatherState>;
  setErrMsg: SetState<string>;
}) {
  const { weather, setLoading, setWeather, setErrMsg } = params;

  try {
    setLoading(true);
    if (!checkIfEnoughTimePassed(weather.secondsSinceEpoch)) {
      return;
    }

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

function checkIfEnoughTimePassed(secondsSinceEpoch: number) {
  const timeSinceEpoch = Math.round(Date.now() / 1000);

  // Use an api call only once every 15 minutes
  return timeSinceEpoch - secondsSinceEpoch >= 900_000;
}

/**********************************************************************************/

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [view, setView] = useState<Views>('day');
  const [errMsg, setErrMsg] = useState<string>('');
  const [weather, setWeather] = useState<WeatherState>({
    result: {
      location: '',
      temperature: '',
      feelsLike: '',
      image: ''
    },
    secondsSinceEpoch: 0
  });

  useEffect(() => {
    async function setInitialWeather() {
      await setDailyWeather({
        weather: weather,
        setLoading: setLoading,
        setWeather: setWeather,
        setErrMsg: setErrMsg
      });
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
        <WeatherImage image={weather.result.image}></WeatherImage>
        <WeatherText
          location={weather.result.location}
          temperature={weather.result.temperature}
          feelsLike={weather.result.feelsLike}
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
          setDailyWeather({
            weather: weather,
            setLoading: setLoading,
            setWeather: setWeather,
            setErrMsg: setErrMsg
          });
        }}
      ></WeatherButton>
    </WeatherStyle>
  );
}
