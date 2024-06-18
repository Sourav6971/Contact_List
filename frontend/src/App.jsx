import { useState, useEffect } from "react";

import "./App.css";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContact();
  }, []);
  const fetchContact = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json(); //our return is of type {"contacts":[]}
    setContacts(data.contacts); // so we have used data.contacts to get the property
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };
  const openCreateModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };
  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };
  const onUpdate = () => {
    closeModal();
    fetchContact();
  };

  return (
    <>
      <ContactList
        contacts={contacts}
        updateContact={openEditModal}
        updateCallback={onUpdate}
      />
      <button onClick={openCreateModal}>Create new Contact</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <ContactForm
              existingContact={currentContact}
              updateCallback={onUpdate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
