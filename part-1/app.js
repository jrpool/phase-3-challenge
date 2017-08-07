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

// Handle a form submission.
app.post(
  '/',
  jsonParser,
  (req, res) => {
    // Handle the non-personalized (information-submission) form.
    if (req.body.firstName) {
      // Respond with the personalized form.
      res.send(knownForm(
        req.body.firstName, req.body.lastName, req.body.favoriteColor
      ));
    }
    // Handle the personalized (cookie-clearing) form.
    else if (req.body.clearInfo) {
      res.send(anonForm());
    }
  }
);

/// /// EXECUTION /// ///

// Make the application listen for queries.
app.listen(3000, () => {
  console.log('App queriable at http://localhost:3000/');
});
