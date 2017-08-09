const {expect} = require('chai');
const pgp = require('pg-promise')();

describe('database functions', function() {

  let db;

  before('create database instance before first test', function() {
    // Create a database instance for testing.
    const cn = {
      host: 'localhost',
      port: 5432,
      database: 'grocery_store'
    };
    db = pgp(cn);
  });

  after('disconnect from database after final test', function() {
    pgp.end();
  });

  context('section_products', function() {

    it('returns table with 15 rows, with Apples as 1st product', function() {
      return db.func('section_products', 'produce')
      .then(
        function(result) {
          expect(result).instanceOf(Array, 'table not an array');
          expect(result).lengthOf(15, 'table row count not 15');
          expect(result[0]).instanceOf(Object, 'row 0 not an object');
          expect(result[0]['product_name']).equal('Apples', '1st not Apples');
        },
        function(error) {
          console.log('Error: ' + error.message);
        }
      );
    });

  });

  context('section_products failures', function() {

    it('returns table with 14 strings, with P 1st product', function() {
      return db.func('section_products', 'produce')
      .then(
        function(result) {
          expect(result).instanceOf(Number, 'table not a number');
          expect(result).lengthOf(14, 'table row count not 14');
          expect(result[0]).instanceOf(String, 'row 0 not a string');
          expect(result[0][0]).equal('P', '1st not P');
        },
        function(error) {
          console.log('Error: ' + error.message);
        }
      );
    });

  });

});
