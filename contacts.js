const fs = require("node:fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(
  __dirname,
  "bd/contacts.json"
);

async function listContacts() {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();

  const finedContact = contactsList.find(
    ({ id }) => id === contactId
  );

  return finedContact || null;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const finedIndexContact = contactsList.findIndex(
    ({ id }) => id === contactId
  );

  if (finedIndexContact === -1) return null;
  const [removedContact] = contactsList.splice(
    finedIndexContact,
    1
  );

  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsList, null, 2)
  );

  return removedContact;
}

async function addContact({name, email, phone}) {
  const contactsList = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };

  contactsList.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactsList, null, 2)
  );

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
