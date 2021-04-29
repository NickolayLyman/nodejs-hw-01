import contactsAction from "./contacts.js";

import { Command } from "commander";
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsAction.listContacts();
      break;

    case "get":
      contactsAction.getContactById(+id);
      break;

    case "add":
      contactsAction.addContact(name, email, phone);
      break;

    case "remove":
      contactsAction.removeContact(+id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
