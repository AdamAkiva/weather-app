import { WeatherImage, WeatherText } from '@/components';
import { styled } from '@/utils';

/**********************************************************************************/

const WeatherStyle = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 2em;
`;

/**********************************************************************************/

export default function App() {
  return (
    <WeatherStyle>
      <WeatherImage></WeatherImage>
      <WeatherText></WeatherText>
    </WeatherStyle>
  );
}
