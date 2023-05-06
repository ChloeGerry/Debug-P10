import { fireEvent, render, screen } from '@testing-library/react';
import Home from './index';
import Form from '../../containers/Form/index';

describe('When Form is created', () => {
  it('a list of fields card is displayed', () => {
    render(<Home />);
    screen.findByText('Nom');
    screen.findByText('Prénom');
    screen.findByText('Personel / Entreprise');
    screen.findByText('Email');
  });

  describe('and a click is triggered on the submit button', () => {
    it('the success message is displayed', async () => {
      render(
        <Home>
          <Form />
        </Home>
      );
      fireEvent(
        await screen.findByText('Envoyer'),
        new MouseEvent('click', {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText('En cours');
      await screen.findByText('Message envoyé !');
    });
  });

  // describe('When a page is created', () => {
  //   it('a list of events is displayed', async () => {
  //     render(<Home />);
  //   });
  //   it('a list a people is displayed', () => {
  //     render(<Home />);
  //     screen.findByTestId('card-image-testid');
  //     screen.findByTestId('card-name-testid');
  //     screen.findByTestId('card-position-testid');
  //   });
  // it("a footer is displayed", () => {
  //   // to implement
  // })
  // it("an event card, with the last event, is displayed", () => {
  //   // to implement
  // })
  // });
});
