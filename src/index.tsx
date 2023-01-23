import { createRoot } from 'react-dom/client';

import AlertComposer from './ui/providers/AlertComposer';
import App from './ui/App';

const rootElement = document.getElementById('root');

rootElement &&
  createRoot(rootElement).render(
    <AlertComposer>
      <App />
    </AlertComposer>
  );
