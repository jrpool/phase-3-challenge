// Import required modules.
const app = require('express')();
const jsonParser = require('body-parser').json(
  {inflate: false, limit: 1000, strict: true, type: 'application/json'}
);

// /// ROUTES /// //

/*
  Give the origin-1 index in an origin-Monday week of the English name of
  a day of the week.
*/
app.get(
  '/api/days/:day',
  (req, res) => {
    const daysOfWeek = {
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
      sunday: 7
    };
    const dayIndex = daysOfWeek[req.params.day.toLowerCase()];
    if (dayIndex) {
      res.status(200).end(dayIndex.toString());
    }
    else {
      res.status(400).end(req.params.day + ' is not a valid day!');
    }
  }
);

/*
  Give a JSON string representing the conversion of the object represented
  by the submitted JSON string into an object with 1 'result' property
  whose value is the concatenation of the arrays in the original object.
*/

const bodyErrorHandler = (err, req, res, next) => {
  if (err) {
    res.status(400).end('Error: invalid request.\n');
  }
};

app.post(
  '/api/array/concat',
  jsonParser,
  bodyErrorHandler,
  (req, res) => {
    if (! req.body) {
      res.status(400).end('Error: Invalid request.');
    }
    else {
      try {
        const arrays = Object.values(req.body);
        if (arrays.every(currentValue => Array.isArray(currentValue))) {
          res.status(200).end(
            JSON.stringify({'result': [].concat(...arrays)}) + '\n'
          );
        }
        else {
          res.status(400).end(JSON.stringify({
            'Error':
            'You submitted valid JSON, but not all values were of type Array.'
          }) + '\n');
        }
      }
      catch (error) {
        res.status(400).end('Invalid request. Error:\n' + error.message + '\n');
      }
    }
  }
);

/// /// EXECUTION /// ///

// Make the application listen for queries.
app.listen(3000, () => {
  console.log('App queriable at http://localhost:3000/');
});
