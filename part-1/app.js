// Import required modules.
const app = require('express')();
const jsonParser = require('body-parser').json(
  {inflate: false, limit: 1000, strict: true, type: 'application/json'}
);
app.use(jsonParser);

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
app.post(
  '/api/array/concat',
  jsonParser,
  (req, res) => {
    const body = req.body;
    try {
      const bodyObject = JSON.parse(body);
      const arrays = bodyObject.values();
      if (arrays.every(currentValue => Array.isArray(currentValue))) {
        res.status(200).end(JSON.stringify({'result': [].concat(...arrays)}));
      }
      else {
        res.status(400).end(JSON.stringify({
          'error':
          'You submitted valid JSON, but not all values were of type Array.'
        }));
      }
    }
    catch {
      res.status(400).end('Invalid request.');
    }
  }
);

/// /// EXECUTION /// ///

// Make the application listen for queries.
app.listen(3000, () => {
  console.log('App queriable at http://localhost:3000/');
});
