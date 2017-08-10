// Import required modules.
const fs = require('fs');
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
    res.type('application/text');
    if (dayIndex) {
      res.status(200).end(dayIndex.toString() + '\n');
    }
    else {
      res.status(400).end(req.params.day + ' is not a valid day!\n');
    }
  }
);

/*
  Give the origin-1 index in an origin-Monday week of the name of a day
  of the week in a specified locale.
*/

const localeDayCallbackFn = (req, res) => {
  return (err, data) => {
    if (err) {
      res.status(400).end(`${req.params.locale} is not available.\n`);
    }
    else if (data.length) {
      const localeDayLines = /dayNames[^]+?wide\{\s+([^]+?)\s+\}/.exec(data);
      if (localeDayLines && localeDayLines.length === 2 && localeDayLines[1]) {
        const localeDayArray = localeDayLines[1].split(',')
          .map((currentValue, index) => {
            return [
              index + 1,
              currentValue.trim().replace(RegExp(/^"|"$/, 'g'), '')
            ];
          });
        const localeDays = {};
        for (const localeDay of localeDayArray) {
          localeDays[localeDay[0]] = localeDay[1];
        }
        const dayName = localeDays[req.params.dayindex];
        if (dayName) {
          res.status(200).end(dayName + '\n');
        }
        else {
          res.status(400).end(
            `${req.params.dayindex} is outside the 1–7 range!\n`
          );
        }
      }
      else {
        res.status(200).end(
          `Days in ${req.params.locale} are not available.\n`
        );
      }
    }
  };
};

app.get(
  '/api/days/:locale/:dayindex',
  (req, res) => {
    res.type('text/plain');
    fs.readFile(
      `./icu-locales/${req.params.locale}.txt`,
      'utf8',
      localeDayCallbackFn(req, res)
    );
  }
);

/*
  Give a JSON string representing the conversion of the object represented
  by the submitted JSON string into an object with 1 'result' property
  whose value is the concatenation of the arrays in the original object.
*/

const genericError = JSON.stringify({'Error': 'Invalid request.'}) + '\n';

const bodyErrorHandler = (err, req, res, next) => {
  if (err) {
    res.status(400).end(genericError);
  }
};

app.post(
  '/api/array/concat',
  jsonParser,
  bodyErrorHandler,
  (req, res) => {
    res.type('application/json');
    if (!req.body) {
      res.status(400).end(genericError);
    }
    else {
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
  }
);

/// /// EXECUTION /// ///

// Make the application listen for queries.
app.listen(3000, () => {
  console.log('App queriable at http://localhost:3000/');
});
