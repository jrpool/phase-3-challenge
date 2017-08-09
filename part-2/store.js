// Import required modules.
const pgp = require('pg-promise')();
const Table = require('cli-table2');
const {handleMessage, errorHandlerFn, messages} = require('./messages');

const args = process.argv.slice(2);

// Define a function that initializes a table.
const initTable = colHeads => {
  return new Table({head: colHeads});
}

// Define a function that populates an initialized table.
const fillTable = (table, rows, columns) => {
  for (const row of rows) {
    table.push(columns.map(currentValue => row[currentValue]));
  }
}

// Create a database instance for database queries.
const cn = {
  host: 'localhost',
  port: 5432,
  database: 'grocery_store'
};
const db = pgp(cn);

// Define a function that lists the products in a specified section.
const productList = section => {
  db.func('section_products', section)
  .then(result => {
    const table = initTable([messages.headprod, messages.headsec]);
    fillTable(table, result, ['product_name', 'section_name']);
    console.log(table.toString());
    pgp.end();
  })
  .catch(err => {
    pgp.end();
    handleMessage(
      messages, 'error', errorHandlerFn(err), ['«unit»', 'product-list']
    );
  });
};

if (args[0] === 'product-list' && args.length === 2) {
  productList(args[1]);
}
