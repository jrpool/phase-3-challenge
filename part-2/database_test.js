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

  context('section_products(\'produce\') successes', function() {

    it('returns array of 15 objects; 1st product_name “Apples”', function() {
      return db.func('section_products', 'produce')
      .then(
        function(result) {
          expect(result).instanceOf(Array, 'table not an array');
          expect(result).lengthOf(15, 'table row count not 15');
          expect(result[0]).instanceOf(Object, 'row 0 not an object');
          expect(result[0]['product_name']).equal('Apples', '1st not Apples');
        }
      );
    });

  });

  context('section_products(\'produce\') FAILURES', function() {

    it('returns number', function() {
      return db.func('section_products', 'produce')
      .then(
        function(result) {
          expect(result).instanceOf(Number, 'result not a number');
        }
      );
    });

    it('returns 14-element array', function() {
      return db.func('section_products', 'produce')
      .then(
        function(result) {
          expect(result).lengthOf(14, 'table row count not 14');
        }
      );
    });

    it('1st row a string', function() {
      return db.func('section_products', 'produce')
      .then(
        function(result) {
          expect(result[0]).instanceOf(String, 'row 0 not a string');
        }
      );
    });

    it('1st product Pears', function() {
      return db.func('section_products', 'produce')
      .then(
        function(result) {
          expect(result[0]['product_name']).equal(
            'Pears', '1st product not Pears'
          );
        }
      );
    });

  });

  context('shopper_transactions(1) successes', function() {

    it('returns array of 3 objects; 1st cost \'  130.26\'', function() {
      return db.func('shopper_transactions', 1)
      .then(
        function(result) {
          expect(result).lengthOf(3, 'table row count not 3');
          expect(result[0]['cost']).equal(
            '  130.26', '1st cost not \'  130.26\''
          );
        }
      );
    });

    context('shopper_transactions (1) FAILURES', function() {

      it('returns array of 2 objects', function() {
        return db.func('shopper_transactions', 1)
        .then(
          function(result) {
            expect(result).lengthOf(2, 'table row count not 2');
          }
        );
      });

      it('1st cost \'  41.05\'', function() {
        return db.func('shopper_transactions', 1)
        .then(
          function(result) {
            expect(result[0]['cost']).equal(
              '   41.05', '1st cost not \'   41.05\''
            );
          }
        );
      });

    });

  });

  context('real_shoppers() successes', function() {

    it('returns array of 5 objects; 1st count 3', function() {
      return db.func('real_shoppers')
      .then(
        function(result) {
          expect(result).lengthOf(5, 'table row count not 5');
          expect(result[1]['transaction_count']).equal(2, '2nd count not 2');
        }
      );
    });

    context('real_shoppers() FAILURES', function() {

      it('returns array of 3 objects', function() {
        return db.func('real_shoppers')
        .then(
          function(result) {
            expect(result).lengthOf(3, 'table row count not 3');
          }
        );
      });

      it('1st count 7', function() {
        return db.func('real_shoppers')
        .then(
          function(result) {
            expect(result[1]['transaction_count']).equal(6, '2nd count not 6');
          }
        );
      });

    });

  });

});
