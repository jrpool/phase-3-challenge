// Import required modules.
const {exec} = require('child-process');
const {makedb} = require('./dbinit');
const {dropdb} = require('./dbdrop');
const {seeddb} = require('./dbseed');

const calledFunction = process.argv[2];

// Execute the requested function, if recognized.
if (calledFunction === 'makedb') {
  makedb();
}
else if (calledFunction === 'dropdb') {
  dropdb();
}
else if (calledFunction === 'seeddb') {
  seeddb('./seed-data.csv');
}
