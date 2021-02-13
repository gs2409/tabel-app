const router = require('express').Router();
let Test = require('../models/test.model');

router.route('/').get((req, res) => {
  Test.find()
    .then(test => res.json(test))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new Test({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;