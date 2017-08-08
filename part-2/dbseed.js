// Import required modules.
const {exec} = require('child_process');
const pgp = require('pg-promise')();
const {handleMessage, errorHandlerFn, messages} = require('./messages');

// Define a function that seeds the grocery_store database.
const dbseed = (seedData) => {

  // Create a database instance for temporary table creation.
  const cn = {
    host: 'localhost',
    port: 5432,
    user: grocer,
    database: 'grocery_store'
  };
  const dbmake = pgp(cnmake);

  // Identify the required queries.
  const queries = [
    'create temporary table seed_data (col0 text, col1 text, col2 text)',
    'copy seed_data from stdin (format csv, header)'
  ];

  /*
    Execute them. (Piping STDIN into psql while making it get its commands
    from a file with -f is impossible. See:
    https://www.postgresql.org/message-id/8452.1289618531%40sss.pgh.pa.us.)
  */
  db.none(queries[0])
  .then(() => {
    exec(`cat ${seedData} | psql -c ${queries[1]} grocery_store grocer`)
  })
  .then(() => {
    const queries = new pgp.QueryFile('./load-data.sql');
    db.none(queries);
  })
  .then(() => {
    pgp.end();
    handleMessage(messages, 'dbseeded');
  })
  .catch(err => {
    pgp.end();
    handleMessage(
      messages, 'error', errorHandlerFn(err), ['«unit»', 'dbseed']
    );
  });
};

exports.dbseed = dbseed;
