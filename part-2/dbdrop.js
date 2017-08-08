// Import required modules.
const pgp = require('pg-promise')();
const {handleMessage, errorHandlerFn, messages} = require('./messages');

// Define a function that deletes the grocery_store database and its owner.
const dbdrop = () => {

  // Create a database instance for database and owner deletion.
  const cn = {
    host: 'localhost',
    port: 5432,
    database: 'postgres'
  };
  const db = pgp(cn);

  // Identify the required queries.
  const queries = [
    'drop database grocery_store',
    'drop role grocer'
  ];

  // Delete the database and its owner.
  db.none(queries[0])
  .then(() => {
    db.none(queries[1])
  })
  .then(() => {
    pgp.end();
    handleMessage(messages, 'dbdropped');
  })
  .catch(err => {
    pgp.end();
    handleMessage(
      messages, 'error', errorHandlerFn(err), ['«unit»', 'dbdrop']
    );
  });

};

exports.dbdrop = dbdrop;
