import { styled } from '@/utils';

/**********************************************************************************/

type ErrorProps = { errMsg: string };

const ErrorStyle = styled('div')`
  text-align: center;
  font-size: 1.66em;
  margin-top: 11em;
`;

/**********************************************************************************/

export default function Error({ errMsg }: ErrorProps) {
  return <ErrorStyle>{errMsg}</ErrorStyle>;
}
