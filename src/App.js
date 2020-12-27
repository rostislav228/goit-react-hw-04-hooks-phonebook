import { useState, useEffect } from "react";
import Section from "./components/Section/Section.js";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter.js";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("contacts"))) {
      localStorage.setItem("contacts", "[]");
      return;
    }
    setContacts(JSON.parse(localStorage.getItem("contacts")));
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const changeHandler = (e) => {
    setFilter(e.target.value);
  };

  const deleteContactbyId = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts([...updatedContacts]);
  };
  const addContact = (contact) => {
    const newName = contact.name;
    const names = contacts.map((contact) => contact.name.toLowerCase());
    if (names.includes(newName.toLowerCase().trim())) {
      alert(`${newName} is already in contact list`);
      return;
    }
    setContacts([...contacts, contact]);
  };

  const filterContactsByName = () => {
    if (contacts.length) {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter onChange={changeHandler} />
        {/* {contacts.length > 1 && <Filter onChange={changeHandler} />} */}
        <ContactList
          contacts={filterContactsByName()}
          onDelete={deleteContactbyId}
        />
      </Section>
    </>
  );
}

// class App extends Component {
//   state = {
//     contacts: [
//       // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//       // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//       // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//       // { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
//     ],
//     filter: "",
//   };

// componentDidMount() {
// if (!JSON.parse(localStorage.getItem("contacts"))) {
//   localStorage.setItem("contacts", "[]");
//   return;
// }
// setState(() => ({
//   contacts: JSON.parse(localStorage.getItem("contacts")),
// }));
// }

// componentDidUpdate(prevProps, prevState) {
//   if (prevState.contacts !== state.contacts) {
// localStorage.setItem("contacts", JSON.stringify(state.contacts));
//   }
// }

// changeHandler = (e) => {
//   const { name, value } = e.target;

//   setState({
//     [name]: value,
//   });
// };

// deleteContactbyId = (id) => {
//   const { contacts } = state;
//   const updatedContacts = contacts.filter((contact) => contact.id !== id);
//   setState({
//     contacts: [...updatedContacts],
//   });
// };

// addContact = (contact) => {
//   const newName = contact.name;
//   const names = state.contacts.map((contact) =>
//     contact.name.toLowerCase()
//   );
//   if (names.includes(newName.toLowerCase().trim())) {
//     alert(`${newName} is already in contact list`);
//   } else {
//     setState((state) => ({
//       contacts: [...state.contacts, contact],
//     }));
//   }
// };

// filterContactsByName = () => {
//   const { contacts, filter } = state;
//   if (contacts.length) {
//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   }
// };

// render() {
//   const { contacts } = state;
//   return (
//     <>
//       <Section title="Phonebook">
//         <ContactForm addContact={addContact} />
//       </Section>
//       <Section title="Contacts">
//         {contacts.length > 1 && <Filter onChange={changeHandler} />}
//         <ContactList
//           contacts={filterContactsByName()}
//           onDelete={deleteContactbyId}
//         />
//       </Section>
//     </>
//   );
//   }
// }

export default App;
