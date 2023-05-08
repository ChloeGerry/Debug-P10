import { fireEvent, render, screen } from '@testing-library/react';
import Modal from './index';

describe('When Modal data is created', () => {
  it('a modal content is display', () => {
    render(
      <Modal opened Content={<div>modal content</div>}>
        {() => null}
      </Modal>
    );
    expect(screen.getByText('modal content')).toBeInTheDocument();
  });
  describe('and a click is triggered to display the modal', () => {
    it('the content of modal is displayed', async () => {
      render(
        <Modal Content={<div>modal content</div>}>
          {() => <button data-testid="open-modal"></button>}
        </Modal>
      );
      fireEvent(
        screen.getByTestId('open-modal'),
        new MouseEvent('click', {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(screen.queryByText('modal content')).not.toBeInTheDocument();
    });
  });

  describe('and a click is triggered to the close button modal', () => {
    it('the content of the modal is hide', async () => {
      render(
        <Modal opened Content={<div>modal content</div>}>
          {() => null}
        </Modal>
      );

      expect(screen.getByText('modal content')).toBeInTheDocument();
      fireEvent(
        screen.getByTestId('close-modal'),
        new MouseEvent('click', {
          cancelable: true,
          bubbles: true,
        })
      );

      expect(screen.queryByText('modal content')).not.toBeInTheDocument();
    });
  });
});
