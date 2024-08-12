import React from "react";

const ContactList = ({ contacts, updateCallback, updateContact }) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_contact/${id}`,
        options
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("failed to delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-serif px-12 m-4 font-bold">Contacts</h2>
      <table>
        <thead>
          <tr>
            <th className="p-4">First Name</th>
            <th className="p-4">Last Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className="py-1 px-4">{contact.firstName}</td>
              <td className="py-1 px-4">{contact.lastName}</td>
              <td className="py-1 px-4">{contact.email}</td>
              <td className="py-1 px-4">
                <button
                  className="bg-blue-400 text-white m-4 px-2 py-1 rounded-md hover:bg-blue-500"
                  onClick={() => updateContact(contact)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white m-4 px-2 py-1 rounded-md hover:bg-red-600"
                  onClick={() => onDelete(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
