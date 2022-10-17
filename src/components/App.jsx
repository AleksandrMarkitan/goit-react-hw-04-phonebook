import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import s from '../components/ContactList/ContactList.module.scss';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );

  const [filter, setFilter] = useState('');

  const addContact = contact => {
    const newContact = {
      id: nanoid(),
      ...contact,
    };
    contacts.some(({ name }) => name === contact.name)
      ? Notify.failure(`${contact.name} is already in contacts!`)
      : setContacts(prevState => [...prevState, newContact]);
  };

  const filtration = filterKey => {
    setFilter(filterKey);
  };

  const contactDelete = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Section>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} addContact={addContact} />
      <div className={s.contacts}>
        <h2 className={s.h2}>Contacts</h2>
        <Filter filtration={filtration} />
        <ContactList
          filter={filter}
          contacts={contacts}
          contactDelete={contactDelete}
        />
      </div>
    </Section>
  );
};
