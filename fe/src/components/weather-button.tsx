import { styled, type OnClickCb } from '@/utils';

/**********************************************************************************/

const WeatherButtonStyleWrapper = styled('div')`
  display: flex;
  justify-content: center;
`;

const WeatherButtonStyle = styled('button')`
  background-image: linear-gradient(to right, #a8b1f0, #5262e0 100%);
  height: 2.5rem;
  width: 9rem;
`;

/**********************************************************************************/

type WeatherButtonProps = { text: string; onClickCb: OnClickCb };

/**********************************************************************************/

export default function WeatherButton({ text, onClickCb }: WeatherButtonProps) {
  return (
    <WeatherButtonStyleWrapper>
      <WeatherButtonStyle onClick={onClickCb}>{text}</WeatherButtonStyle>
    </WeatherButtonStyleWrapper>
  );
}
