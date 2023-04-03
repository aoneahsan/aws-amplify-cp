import React from 'react';
import { render } from '@testing-library/react';
import AppEntryPoint from './AppEntryPoint';

test('renders without crashing', () => {
  const { baseElement } = render(<AppEntryPoint />);
  expect(baseElement).toBeDefined();
});
