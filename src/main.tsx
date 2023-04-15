import { createRoot } from 'react-dom/client';
import AppEntryPoint from './AppEntryPoint';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container!);
  root &&
    root.render(
      // <React.StrictMode> // this is causing aws amplify to render twice
      <>
        <AppEntryPoint />
      </>
    );
} else {
  alert('No Container found to render the app.');
}
