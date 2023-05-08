import { fireEvent, render, screen } from '@testing-library/react';
import Form from './index';

describe('When Events is created', () => {
  it('a list of event card is displayed', async () => {
    render(<Form />);
    expect(await screen.findByText('Email'));
    expect(await screen.findByText('Nom'));
    expect(await screen.findByText('Prénom'));
    expect(await screen.findByText('Personel / Entreprise'));
  });

  describe('and a click is triggered on the submit button', () => {
    it('the success action is called', async () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      fireEvent(
        await screen.findByTestId('selected'),
        new MouseEvent('click', {
          cancelable: true,
          bubbles: true,
        })
      );

      fireEvent(
        await screen.findByTestId('Entreprise'),
        new MouseEvent('click', {
          cancelable: true,
          bubbles: true,
        })
      );

      fireEvent(
        await screen.findByTestId('button-test-id'),
        new MouseEvent('click', {
          cancelable: true,
          bubbles: true,
        })
      );

      expect(await screen.findByText('En cours')).toBeVisible();
      expect(await screen.findByText('Envoyer')).toBeVisible();
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
