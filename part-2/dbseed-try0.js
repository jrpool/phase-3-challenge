// Import required modules.
const {exec} = require('child_process');
const {handleMessage, errorHandlerFn, messages} = require('./messages');

// Define a function that seeds the grocery_store database.
const seeddb = (seedData) => {
  exec(
    `cat ${seedData} | psql -f ./load-data.sql grocery_store grocer`,
    (error, stdout, stderr) => {
      if (error) {
        handleMessage(
          messages, 'error', errorHandlerFn(err), ['«unit»', 'dbseed']
        );
      }
      else {
        console.log(stdout);
        console.log(stderr);
      }
    }
  );
};

exports.seeddb = seeddb;
