import PropTypes from 'prop-types';
import { Contact } from './ContactItem';
import { DeleteButton } from '../Button/Button';
import s from './ContactList.module.scss';

export const ContactList = ({ contacts, filter, contactDelete }) => {
  return (
    <ul className={s.list}>
      {contacts
        .filter(contact => contact.name.toLowerCase().includes(filter))
        .map(contact => (
          <li key={contact.id} className={s.item}>
            <Contact contact={contact} />
            <DeleteButton
              type="button"
              contactDelete={contactDelete}
              contactId={contact.id}
            />
          </li>
        ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  contactDelete: PropTypes.func.isRequired,
};
