import React from 'react';
import { createRoot } from 'react-dom/client';
import AppEntryPoint from 'AppEntryPoint';

const container = document.getElementById('root') as HTMLDivElement;
if (container) {
  const root = createRoot(container);
  root &&
    root.render(
      <>
        {/* React.StrickMode causing amplify to render twice  */}
        <AppEntryPoint />
      </>
    );
}
