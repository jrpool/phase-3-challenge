# phase-3-challenge
Learners Guild assessment of readiness for Phase 3

## Project Members

[Jonathan Pool](https://github.com/jrpool)

## Discussion

This repository contains work done for an assessment of readiness for Phase 3 of the curriculum of [Learners Guild][lg].

The applications are intended to satisfy the [specifications][specs] of the assessment.

### Deviations

Deviations or possibly deviant interpretations of the specifications include:

- The part-1 application permits `:day` parameters that differ from the stored day strings in letter case. For example, “Monday” is accepted as “monday”.

- In the part-2 application, the term “order” is replaced by “transaction”. The motivation is to eliminate the risk of confusion between “order” as an interface concept and “order” as a reserved word in the “order by” operator of PostgreSQL, while also avoiding a bifurcation between the interface and the source-code descriptors of the interface concept.

- In the part-2 application, the specifications are interpreted (in the absence of an explicit prohibition) to permit the use of an external table-display module producing the specified format with more finished decorations.

- In the part-2 application, the term “database schema” is interpreted to include any stored functions and documentation (i.e. `COMMENT` statements), in addition to `CREATE TABLE` statements. Consequently, the requirement to include database query functions in `database.js` is interpreted to permit those query functions to make use of functions stored in the database.

- In the part-2 application, the specifications are interpreted to permit a customized list of products.

## Installation

0. These instructions presuppose that (1) [npm][npm] and [PostgreSQL][pg] are installed, (2) there is a PostgreSQL database cluster, (3) PostgreSQL is running, and (4) when you connect to the cluster you are a PostgreSQL superuser.

1. Your copy of this project will be located in its own directory, inside some other directory that you may choose or create. For example, to create that parent directory inside your own home directory’s `Documents` subdirectory and call it `projects`, you can execute:

    `mkdir ~/Documents/projects`

Make that parent directory your working directory, by executing, for example:

    `cd ~/Documents/projects`

2. Clone this project’s repository into it, thereby creating the project directory, named `phase-3-challenge`, by executing:

    `git clone https://github.com/jrpool/phase-3-challenge.git phase-3-challenge`

2. Make the project directory your working directory by executing:

    `cd phase-3-challenge`

3. Install required dependencies (you can see them listed in `package.json`) by executing:

    `npm i`

## Usage and Examples

### Part 1

Make `part-1` your current directory and execute `npm start`. In another terminal window, enter commands such as:

```
curl http://localhost:3000/api/days/tuesday
curl http://localhost:3000/api/array/concat -d '{"a": [1, 2, 3], "b": ["x", "y"]}'
```

To stop the application, send a SIGINT signal to its process, by entering the keypress CONTROL-C in the terminal window.

### Part 2

Make `part-2` your current directory.

To create the database, execute `npm run dbinit`.

To seed the database with sample data, execute `npm run dbseed`.

To destroy the database, execute `npm run dbdrop`.

To perform tests, execute `npm test`.

To use the application, in another terminal window execute commands such as:

```
./store product-list produce
./store shopper-transactions 1
./store real-shoppers
```

### Part 3

In a web browser, open the file `part-3/grocer.html`.

### All parts

To perform linting, in any of the 3 part directories, execute `npm run lint`.

[lg]: https://www.learnersguild.org
[npm]: https://www.npmjs.com/
[specs]: https://github.com/jrpool/phase-3-challenge/blob/master/README-specs.md
