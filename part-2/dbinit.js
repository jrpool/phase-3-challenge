// Import required modules.
const pgp = require('pg-promise')();
const {handleMessage, errorHandlerFn, messages} = require('./messages');

/*
  Define a function that creates the grocery_store database and its owner
  and defines the schema of the database.
*/
const makedb = () => {
  // Create a database instance for database creation.
  const cnmake = {
    host: 'localhost',
    port: 5432,
    database: 'postgres'
  };
  const dbmake = pgp(cnmake);
  // Create a database instance for schema creation.
  const cnschema = {
    host: 'localhost',
    port: 5432,
    user: 'grocer',
    database: 'grocery_store'
  };
  const dbschema = pgp(cnschema);
  // Identify the required queries for database and owner creation.
  const queries = [
    'create role grocer login',
    'comment on role grocer is \'Owner of grocery store\'',
    'create database grocery_store owner grocer',
    'comment on database grocery_store is \'Data of grocery store\''
  ];
  // Execute them.
  dbmake.task('dbmake', task => {
    return task.none(queries[0])
    .then(() => {return task.none(queries[1]);})
    .then(() => {return task.none(queries[2]);})
    .then(() => {return task.none(queries[3]);})
    .then(() => {
      dbmake.$pool.end;
      return handleMessage(messages, 'dbmade');
    })
    .then(() => {
      // Create the database schema.
      return dbschema.task('dbschema', task => {
        const queries = new pgp.QueryFile('./schema.sql');
        return task.none(queries);
      })
    })
    .catch(err => {
      handleMessage(messages, 'error', errorHandlerFn(err), 'dbmakefail');
      pgp.end();
    });
  });
};
