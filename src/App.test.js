import { screen, render } from './test-util';
import App from './App';

test('renders learn react link', () => {
  render(<App />);

  const spanElement = screen.getByText(/loading.../i);

  expect(spanElement).toBeInTheDocument();
});
