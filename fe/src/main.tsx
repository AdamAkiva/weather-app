import { ReactDOM, StrictMode } from '@/utils';

import App from '@/app.tsx';

import '@/assets/styles/index.css';

/**********************************************************************************/

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
