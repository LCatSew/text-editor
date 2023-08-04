import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// I feel like this may need to be a post method instead of a put method
export const putDb = async (content) => {
  console.log ('PUT to database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  //create a transaction on the database
  const tx = jateDb.transaction('jate', 'readwrite');

  //open the specific object store
  const store = tx.objectStore('jate');

  //add the item to the object store
  const request = await store.add(content);

  //return the result
  const result = await request;
  console.log('result.value', result);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log ('GET from database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);

  //create a transaction on the database
  const tx = jateDb.transaction('jate', 'readonly');

  //open the specific object store
  const store = tx.objectStore('jate');

  //get all the items in the object store
  const request = await store.getAll();

  //return the items
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
