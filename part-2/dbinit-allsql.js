// Import required modules.
const pgp = require('pg-promise')();
const {handleMessage, errorHandlerFn, messages} = require('./messages');

/*
  Create a database instance for creating the grocery_store database
  and its owner.
*/
const cnmake = {
  host: 'localhost',
  port: 5432,
  database: 'postgres'
};
const dbmake = pgp(cnmake);

// Create a database instance for creating the database schema.
const cnschema = {
  host: 'localhost',
  port: 5432,
  user: 'grocer',
  database: 'grocery_store'
};
const dbschema = pgp(cnschema);

// Identify the required queries for creating the database and its owner.
const queries = [
  'create role grocer login',
  'comment on role grocer is \'Owner of grocery store\'',
  'create database grocery_store owner grocer',
  'comment on database grocery_store is \'Data of grocery store\''
];

// Create the database and its owner.
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
    .catch(err => {
      handleMessage(
        messages, 'error', errorHandlerFn(err), ['«unit»', 'dbmake']
      );
      pgp.end();
    });
  })
  .then(() => {
    pgp.end();
    return handleMessage(messages, 'dbfilled');
  })
  .catch(err => {
    handleMessage(
      messages, 'error', errorHandlerFn(err), ['«unit»', 'dbmake']
    );
    pgp.end();
  });
});
