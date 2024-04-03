import { CircularProgress, type SxProps, type Theme } from '@/utils';

/**********************************************************************************/

const CircularProgressStyle: SxProps<Theme> = {
  position: 'fixed',
  minHeight: '6.66vh',
  minWidth: '6.66vw',
  top: '50%',
  left: '50%'
};

/**********************************************************************************/

export default function LoadingComponent() {
  return <CircularProgress sx={CircularProgressStyle} />;
}
