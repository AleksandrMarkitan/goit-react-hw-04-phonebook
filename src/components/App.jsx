import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import s from '../components/ContactList/ContactList.module.scss';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = contact => {
    const newContact = {
      id: nanoid(),
      ...contact,
    };
    this.state.contacts.some(({ name }) => name === contact.name)
      ? Notify.failure(`${contact.name} is already in contacts!`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  filtration = filterKey => {
    this.setState({
      filter: filterKey,
    });
  };

  contactDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const contactsFromStorage = JSON.parse(localStorage.getItem('contacts'));
    contactsFromStorage &&
      this.setState({
        contacts: contactsFromStorage,
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter, name, number } = this.state;
    return (
      <Section>
        <h1>Phonebook</h1>
        <ContactForm
          contacts={contacts}
          name={name}
          number={number}
          handleContactInput={this.handleContactInput}
          addContact={this.addContact}
        />
        <div className={s.contacts}>
          <h2 className={s.h2}>Contacts</h2>
          <Filter filtration={this.filtration} />
          <ContactList
            filter={filter}
            contacts={contacts}
            contactDelete={this.contactDelete}
          />
        </div>
      </Section>
    );
  }
}
