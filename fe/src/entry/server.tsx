import { View } from '@/components';
import { renderToString, StrictMode } from '@/utils';

/**********************************************************************************/

export function render() {
  return renderToString(
    <StrictMode>
      <View />
    </StrictMode>
  );
}
