import { useState } from "react";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");

  const updating = Object.entries(existingContact).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
    };
    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_contact/${existingContact.id}` : "create_contact");
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);
    if (response.status !== 201 && response.status != 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      //successfull
      updateCallback();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="pb-2">
        <label htmlFor="firstName" className="font-mono text-bold text-2xl m-4">
          First Name:
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          className="border rounded-md border-gray-400 w-96 p-2 font-mono"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        ></input>
      </div>
      <div className="pb-2">
        <label htmlFor="lastName" className="font-mono text-bold text-2xl m-4">
          Last Name:
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          className="border border-gray-400 p-2 w-96 rounded-md font-mono ml-3"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        ></input>
      </div>
      <div className="pb-2">
        <label htmlFor="email" className="font-mono text-bold text-2xl m-4">
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          className="border border-gray-400 w-96 p-2 rounded-md font-mono ml-16 mb-2"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 p-4 text-white rounded-md text-xl hover:bg-blue-700 m-4"
        >
          {updating ? "Update Contact" : "Create Contact"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
