/*
  Define a function that formulates and delivers a message, optionally
  replacing placeholders.
  Preconditions:
    0. messages is an object.
    1. messageKey is one of the properties of messages.
    2. handler (optional) is a function with 1 string argument.
    2. fromTo (optional) is an array of 2 elements:
      a. a nonblank string without any RegExp metacharacters.
      b. a string.
*/
exports.handleMessage = (messages, messageKey, handler, fromTo) => {
  let message = messages[messageKey];
  if (fromTo) {
    message = message.replace(RegExp(fromTo[0], 'g'), fromTo[1]);
  }
  if (handler === '=') {
    return message;
  }
  else if (handler) {
    handler(message);
  }
  else {
    console.log(message + '\n');
  }
};

// Define a function that returns a handler for an error message.
exports.errorHandlerFn = err => {
  return message => {
    console.log(message + err.message + '\n');
  };
};

// Messages in English.
exports.messages = {
  'dbmade': 'The database and its owner have been created.',
  'dbschemamade': 'The database schema has been created.',
  'dbdropped': 'The database and its owner have been deleted.',
  'dbseeded': 'The database has been seeded with example data.',
  'error': 'An error has occurred in «unit». Error message:\n',
  'headcost': 'Total Cost',
  'headtrans': 'Transac-\ntion ID',
  'headprod': 'Product Name',
  'headsec': 'Section Name',
  'headshopper': 'Shopper Name',
  'headtranscount': 'Number of\nTransac-\ntions'
};
