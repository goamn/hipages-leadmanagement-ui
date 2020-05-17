import React from 'react';
import { render } from '@testing-library/react';
import LeadManagement from './LeadManagement';

test('renders learn react link', () => {
  const { getByText } = render(<LeadManagement />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
