import { fireEvent, render, screen } from '@testing-library/react';
import Home from './index';
import { api, DataProvider } from '../../contexts/DataContext';

const data = {
  events: [
    {
      id: 1,
      type: 'conférence',
      date: '2022-04-29T20:28:45.744Z',
      title: 'User&product MixUsers',
      cover: '/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png',
      description: 'Présentation des nouveaux usages UX',
      nb_guesses: 900,
      periode: '14-15-16 Avril',
      prestations: [
        '1 espace d’exposition',
        '1 scène principale',
        '1 espace de restauration',
      ],
    },
  ],
  focus: [
    {
      title: 'World economic forum',
      description:
        'Oeuvre à la coopération entre le secteur public et le privé.',
      date: '2022-01-29T20:28:45.744Z',
      cover: '/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png',
      id: 1,
    },
  ],
};

describe('When Form is created', () => {
  it('a list of fields card is displayed', async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    expect(await screen.findByText('Nom')).toBeVisible();
    expect(await screen.findByText('Prénom')).toBeVisible();
    expect(await screen.findByText('Personel / Entreprise')).toBeVisible();
    expect(await screen.findByText('Email')).toBeVisible();
  });

  describe('and a click is triggered on the submit button', () => {
    it('the success message is displayed', async () => {
      api.loadData = jest.fn().mockReturnValue(data);
      jest.spyOn(window, 'alert').mockImplementation(() => {});

      render(
        <DataProvider>
          <Home />
        </DataProvider>
      );

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
        await screen.findByText('Envoyer'),
        new MouseEvent('click', {
          cancelable: true,
          bubbles: true,
        })
      );

      expect(await screen.findByText('En cours')).toBeVisible();
      expect(await screen.findByText('Message envoyé !')).toBeVisible();
    });
  });

  describe('When a page is created', () => {
    it('a list of events is displayed', () => {
      // to implement
    });
    it('a list a people is displayed', () => {
      // to implement
    });
    it('a footer is displayed', () => {
      // to implement
    });
    it('an event card, with the last event, is displayed', () => {
      // to implement
    });
  });
});
