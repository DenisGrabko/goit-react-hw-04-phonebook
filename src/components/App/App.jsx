import { Component } from 'react';
import { nanoid } from 'nanoid';


import Filter from '../Filter/Filter';
import { Container, Wrapper, Title } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

   componentDidMount() {
    const localData = localStorage.getItem('contacts')
    if (localData) this.setState({ contacts: JSON.parse(localData) })    
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.contacts.length !== this.state.contacts.length ){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))}
  }

  onAddContact = data => {
    const isExist = this.state.contacts.some(contact => {
      return contact.name.toLowerCase() === data.name.toLowerCase();
    });

    if (isExist) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        {
          id: nanoid(),
          name: data.name,
          number: data.number,
          bgColor: 'green',
          color: 'green',
        },
      ],
    }));
  };

  onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  onSearchContact = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <Container>
        <Title>Phonebook</Title>
        <Wrapper>
          <ContactForm onAddContact={this.onAddContact} />
          {this.state.contacts.length > 0 ? (
            <>
              <Filter onSearchContact={this.onSearchContact} />
              <ContactList
                filteredContacts={filteredContacts}
                onDeleteContact={this.onDeleteContact}
              />
            </>
          ) : (
            <h2>No contacts yet</h2>
          )}
        </Wrapper>
      </Container>
    );
  }
}

export default App;