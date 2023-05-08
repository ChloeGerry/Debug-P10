import { render, screen } from '@testing-library/react';
import Menu from './index';

describe('When Menu is created', () => {
  it('a list of mandatories links and the logo are displayed', async () => {
    render(<Menu />);
    expect(await screen.findByText('Nos services'));
    expect(await screen.findByText('Nos réalisations'));
    expect(await screen.findByText('Notre équipe'));
    expect(await screen.findByText('Contact'));
  });
});
