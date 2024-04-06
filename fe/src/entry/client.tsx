import { View } from '@/components';
import { hydrateRoot, StrictMode } from '@/utils';

import '@/assets/styles/index.css';

/**********************************************************************************/

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <View />
  </StrictMode>
);
