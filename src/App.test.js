import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the skip link and exactly one top-level heading', () => {
  render(<App />);

  expect(screen.getByText(/skip to content/i)).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
});

test('the hero call to action points at the contact section', () => {
  render(<App />);

  expect(screen.getByRole('link', { name: /get in touch/i })).toHaveAttribute(
    'href',
    '#contact'
  );
});
