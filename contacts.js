import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) { return null; }
  const [deletedContacts] = contacts.splice(index, 1);
  const strContacts = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, strContacts);
  return deletedContacts;
};

const addContact = async ({ id, name, email, phone }) => {
  const contacts = await listContacts();
  const payload = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(payload);
    const stringedContacts = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, stringedContacts);
    return payload;
};

export default {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

