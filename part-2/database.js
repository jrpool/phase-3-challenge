// Import required modules.
const {dbinit} = require('./dbinit');
const {dbdrop} = require('./dbdrop');
const {dbseed} = require('./dbseed');

const calledFunction = process.argv[2];

// Execute the requested function, if recognized.
if (calledFunction === 'dbinit') {
  dbinit();
}
else if (calledFunction === 'dbdrop') {
  dbdrop();
}
else if (calledFunction === 'dbseed') {
  dbseed('./seed-data.csv');
}
