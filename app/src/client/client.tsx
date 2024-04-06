import { View } from './components';
import { StrictMode, hydrateRoot } from './utils';

import './assets/styles/index.css';

/**********************************************************************************/

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <View />
  </StrictMode>
);
