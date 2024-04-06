import { View } from './components';
import { StrictMode, renderToString } from './utils';

/**********************************************************************************/

export function render() {
  return renderToString(
    <StrictMode>
      <View />
    </StrictMode>
  );
}
