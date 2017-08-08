// Import required modules.
const {exec} = require('child_process');
const pgp = require('pg-promise')();
const {handleMessage, errorHandlerFn, messages} = require('./messages');

// Define a function that seeds the grocery_store database.
const dbseed = (seedData) => {

  // Create a database instance for database seeding.
  const cn = {
    host: 'localhost',
    port: 5432,
    user: 'grocer',
    database: 'grocery_store'
  };
  const db = pgp(cn);

  /*
    Load and install the seed data. (psql treats a file containing a
    copy or \copy command as STDIN. pg-promise does not support copying
    from STDIN. See:
    https://github.com/vitaly-t/pg-promise/issues/122
    https://github.com/vitaly-t/pg-promise/wiki/Data-Imports
  */
  exec('psql -f ./load-data.sql grocery_store grocer', () => {
    const installQueries = new pgp.QueryFile('./install-data.sql');
    db.none(installQueries)
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
  });

};

exports.dbseed = dbseed;
