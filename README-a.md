# Phase 3 Interview Challenge B

This is the challenge for getting into phase 3. There are 3 parts to the challenge.

To get started, create a new repository called `phase-3-challenge`. Do all of your work in this repo and submit it as your solution.

Skills covered:

- Programming
- Programming in JS
- Node.js
- HTTP
- HTTP Applications
- HTML & CSS
- The Browser
- SQL

Each requirement has a point value. A fully complete requirement gets full points; partially complete requirements get partial points; incomplete requirements get no points. Completeness is determined by calculating points earned divided by total points available.

## General Requirements

- [ ] __10:__ Solution is in a public repository called `phase-3-challenge`.
- [ ] __10:__ Solution repository has 3 folders: `part-1`, `part-2`, and `part-3`.
- [ ] __10:__ Solution repository inclu
a `.gitignore` ignoring files that don't shouldn't be committed (e.g. `node_modules/`, `*.log` files).
- [ ] __10:__ Parts 1 and 2 have their own `package.json` specifying dependencies.
- [ ] __20:__ Git history shows frequent commits.

## Part 1: Simple web app

Build a very basic web API which conforms to the routes listed below.

Use Express. You don't need to use an HTML templater like EJS or Pug, just respond with plain text. (You can use `curl` or `Postman` to check whether the routes work)

The web server should provide the following routes:

```
GET /api/days/:day
POST /api/array/concat
```

#### Route 1: GET /api/days/:day
Your application should define an object called `daysOfWeek`
```javascript
daysOfWeek = {monday: 1, tuesday:2, wednesday: 3, thursday: 4, friday: 5, saturday: 6, sunday: 7}
```
The response is determined by looking up the url param passed into the route `:day` from the `daysOfWeek` object. An example will make this clearer -
```
request: GET /api/days/wednesday
response: 3
status: 200

request: GET /api/days/friday
response: 5
status: 200

request: GET /api/days/holiday
response: `'holiday' is not a valid day!`
status: 400
```

#### Route 2: POST /api/array/concat
Example requests
```
request: POST /api/array/concat
request body params: {"array1": [1,3],
                      "array2": [5,6]}
request content type: application/json
response: {"result": [1,3,5,6]}
response content type: application/json

request: POST /api/array/concat
request body params: {"array1": "abcd",
                      "array2": [5,6]}
request content type: application/json
response status code: 400
response: {"error": "Input data should be of type Array."}
response content type: application/json
```

### Requirements

- [ ] __10:__ All files are stored under the `part-1/` folder
- [ ] __10:__ All dependencies are specified in a `package.json` file
- [ ] __10:__ Web server can be started with `npm start` command
- [ ] __20:__ GET requests to the `/api/days/:day` route responds with  content type `application/text`, as described in the example above
- [ ] __80:__ POST requests to the `/api/array/concat`, concatenates the two arrays provided in the request body and responds with the result. An invalid array should return a 400 response.

## Part 2: Command Line Grocery Store

Build a command line tool that emulates a grocery store. The tool will interact with a PostgreSQL database to store and retrieve information. You will have to design a database to store **grocery items**, **shoppers**, and **orders**. Let's call the database `grocery_store`.

You'll need to design the schema and write some SQL statements to insert data. Look closely at the commands and their sample outputs to determine how to design your schema.

Write a command line script called `store` that retrieves information from the database

The `store` command should support the following sub commands:

| command        | description                                              | example usage                            |
|----------------|----------------------------------------------------------|------------------------------------------|
| product-list   | lists all products which belong to the given section     | ./store product-list `<product-section>` |
| shopper-orders | lists the orders for a given shopper                     | ./store shopper-orders `<shopper-id>`    |
| real-shoppers  | lists the names of all shoppers who have at least 1 order | ./store real-shoppers                    |

### Example Usage

Note: The example output below is not exactly what you would see in reality. (Since the output would depend on the seed data that you add to your database) Use the output below as a template for how each command should display the data.

#### List all `products` from a `section`
```
$ ./store product-list dairy
|--------------+---------+
| Product Name | Section |
|--------------+---------+
| Butter       | dairy   |
| Cheese       | dairy   |
| Cream Cheese | dairy   |
| Eggs         | dairy   |
| Milk         | dairy   |
| Sour Cream   | dairy   |
| Yogurt       | dairy   |
|--------------+---------+
```

#### List all orders for a given `shopper id`, returns the `order id`, and the total cost of the order.
```
$ ./store shopper-orders 1
|----------+------------|
| order id | total cost |
|----------+------------|
|        1 |      27.99 |
|        4 |      18.75 |
|----------+------------|
```

#### List all the `shoppers` that have at least 1 order, and also display the number of orders for them.
```
$ ./store real-shoppers
|--------------+------------------|
| shopper name | number of orders |
|--------------+------------------|
| Shanti       |                1 |
| Mary         |                2 |
| Justin       |                2 |
|--------------+------------------|
```

### Requirements
- [ ] __10:__ All files are stored under the `part-2/` folder
- [ ] __10:__ Database schema (all `CREATE TABLE` statements) is defined in a file `schema.sql`
- [ ] __10:__ SQL script to insert [grocery seed data][grocery-data] and load from CSV is created in a file `load-data.sql`
- [ ] __10:__ SQL statements to insert data into the `orders` and `shoppers` table is added to the file `load-data.sql`. (Add at least 5 rows in each table)
- [ ] __10:__ All database query functions are written in a file `database.js`, and tests for queries are written in a file `database_test.js`
- [ ] __10:__ Tests can be run with the command `$ npm test`

User Stories: Ensure that your schema design can satisfy the following scenarios
- [ ] __10__: As a shopper I can fetch all my orders
- [ ] __10__: As a shopper I can have multiple items in an order. (Assume the quantity of each item is always 1)

Command line interface requirements
- [ ] __10__: Create a command line Node script called `store.js`
- [ ] __20__: Command `product-list` has been implemented
- [ ] __40__: Command `shopper-orders` has been implemented
- [ ] __30__: Command `real-shoppers` has been implemented

Write tests with [Mocha](https://mochajs.org/) + [Chai](http://chaijs.com/) in `database_test.js` that assert:
- [ ] __20__: The database function for the command `product-list` is tested
- [ ] __20__: The database function for the command `shopper-orders` is tested
- [ ] __20__: The database function for the command `real-shoppers` is tested

## Part 3: Web interface for grocery store

Create a front-end only site for an online grocery store where users can choose from a list of items and add them to a cart.

You only need to write HTML, CSS, and JavaScript. No web server is required.

The initial layout has already been provided for you in the [grocer.html][grocer-html] and [grocer.css][grocer-css] files. From this base, build the modal and add interactive behavior with JS.

Note that this interface has been intentionally simplified for the purposes of this challenge: for example, when adding multiple items it will just duplicate the same item instead of adding to a quantity.

### Wireframe

Clicking on the "Cart" button opens the cart modal.

![modal](https://user-images.githubusercontent.com/709100/28130774-e553e572-6705-11e7-9477-bc8e17f8e71e.png)

### Requirements

- [ ] __10:__ All files are stored under the `part-3/` folder
- [ ] __20:__ No third party CSS or JS libraries are used (all code must be written from scratch)
- [ ] __10:__ HTML, CSS, and JS are separated into their own files.
- [ ] __20:__ Clicking on a section in the "Sections" sidebar will jump to that section in the page
- [ ] __20:__ Clicking on "Add to cart" will update the number displayed next to the "Cart" button to show the total number of items in the user's cart
- [ ] __20:__ Clicking on the "Cart" button will show the cart modal with a list of all items added
- [ ] __20:__ Clicking on the "Clear" button in the cart modal removes all items from the cart
- [ ] __20:__ Clicking on the "X" button in the cart modal closes the modal
- [ ] __20:__ The "Total" in the cart modal shows the calculated sum of all item prices

[grocery-data]: https://gist.github.com/lg-bot/1be9e9b91fc0f972b74b72df34c99d3d#file-grocery-csv
[grocer-html]: https://gist.github.com/lg-bot/1be9e9b91fc0f972b74b72df34c99d3d#file-grocer-html
[grocer-css]: https://gist.github.com/lg-bot/1be9e9b91fc0f972b74b72df34c99d3d#file-grocer-css
