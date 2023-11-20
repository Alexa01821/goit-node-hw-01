const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const { Command } = require("commander");
const argv = require("yargs").argv;

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

async function invokeAction({
  action,
  id,
  name,
  email,
  phone,
}) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      return console.table(contactsList);

    case "get":
      const finedContact = await getContactById(id);
      return console.log(finedContact);

    case "add":
      const newContact = await addContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);

    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);

    default:
      return console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
