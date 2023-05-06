import PropTypes from 'prop-types';
import './style.scss';

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  INPUT_EMAIL: 2,
  TEXTAREA: 3,
};

const Field = ({ type, label, name, placeholder, value, onChange }) => {
  let component;

  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          value={value}
          onChange={onChange}
          required
        />
      );
      break;
    case FIELD_TYPES.INPUT_EMAIL:
      component = (
        <input
          type="email"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          value={value}
          onChange={onChange}
          required
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (
        <textarea
          name={name}
          data-testid="field-testid"
          required
          value={value}
          onChange={onChange}
        />
      );
      break;
    default:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          value={value}
          onChange={onChange}
          required
        />
      );
  }
  return (
    <div className="inputField">
      <label className="inputField__label">{label}</label>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
Field.defaultProps = {
  label: '',
  placeholder: '',
  name: 'field-name',
};

export default Field;
