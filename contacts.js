import fs from 'fs';
import path from 'path';
import shortid from 'shortid';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const contactsPath = path.join(resolve(__dirname, './db/contacts.json'));

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err);
    }
    const rawData = data.toString();

    if (!rawData) {
      process.exit(1);
    }

    const contactList = JSON.parse(rawData);

    if (contactList.length === 0) {
      console.log('Contact list is empty!');
      return;
    }
    console.table(contactList);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err);
    }

    const rawData = data.toString();

    if (!rawData) {
      process.exit(1);
    }

    const contactList = JSON.parse(rawData);

    const foundContact = contactList.find(({ id }) => id === contactId);

    if (foundContact) {
      console.table([foundContact]);
    } else {
      process.exit(1);
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err);
    }

    const rawData = data.toString();

    if (!rawData) {
      process.exit(1);
    }

    const contactList = JSON.parse(rawData);
    const filteredContacts = contactList.filter(({ id }) => id !== contactId);

    if (contactList.length !== filteredContacts.length) {
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts), err => {
        if (err) {
          console.error(err.message);

          process.exit(1);
        }
      });
    }
    console.log('Contact was deleted successfully!');
    listContacts();
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(err);
    }

    const rawData = data.toString();

    const contactlist = JSON.parse(rawData);
    const id = shortid.generate();

    if (name && email && phone) {
      contactlist.push({ id, name, email, phone });
      fs.writeFile(contactsPath, JSON.stringify(contactlist), err => {
        if (err) {
          console.error(err);
        }
        console.log('Contacts was added and saved successfuly');
        console.table(contactlist);
      });
    }
  });
}

const contactsAction = {
  listContacts,
  removeContact,
  addContact,
  getContactById,
};

export default contactsAction;
