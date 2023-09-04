import React from 'react';
import { render } from '@testing-library/react';
import AppHocWrapper from './AppHocWrapper';

test('renders without crashing', () => {
  const { baseElement } = render(<AppHocWrapper />);
  expect(baseElement).toBeDefined();
});
