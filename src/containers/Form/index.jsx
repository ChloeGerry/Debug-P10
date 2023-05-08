import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Field, { FIELD_TYPES } from '../../components/Field';
import Select from '../../components/Select';
import Button, { BUTTON_TYPES } from '../../components/Button';

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [email, setEmail] = useState('');
  const [postContent, setPostContent] = useState('');

  const updateSelectedEvent = (newValue) => {
    setSelectedEvent(newValue);
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      if (!selectedEvent) {
        alert("Vous devez choisir un type d'événement");
        return;
      }
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
        setLastName('');
        setFirstName('');
        setSelectedEvent('');
        setEmail('');
        setPostContent('');
      } catch (err) {
        console.log(err);
        setSending(true);
        onError(err);
      }
    },
    [onSuccess, onError, selectedEvent]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            label="Nom"
            name="Nom"
            type={FIELD_TYPES.INPUT_TEXT}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Field
            placeholder=""
            label="Prénom"
            name="Prenom"
            type={FIELD_TYPES.INPUT_TEXT}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Select
            selection={['Personel', 'Entreprise']}
            label="Personel / Entreprise"
            name="selected"
            type="large"
            titleEmpty
            value={selectedEvent}
            onChange={updateSelectedEvent}
          />
          <Field
            placeholder=""
            label="Email"
            name="Email"
            type={FIELD_TYPES.INPUT_EMAIL}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? 'En cours' : 'Envoyer'}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            name="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
