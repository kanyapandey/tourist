var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tourist');
var Schema = mongoose.Schema;

var touristDataSchema = new Schema({
  username: {type: String, required: true},
  email: String,
  member: String,
  days: String,
  food: String,
  theme: String,
  notes: String,
}, {collection: 'tourist-data'});

var TouristData = mongoose.model('TouristData', touristDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  TouristData.find()
      .then(function(doc) {
        res.render('index', {items: doc});
      });
});

router.post('/insert', function(req, res, next) {
  var item = {
    username: req.body.username,
    email: req.body.email,
    member: req.body.member,
    days: req.body.days,
    food: req.body.food,
    theme: req.body.theme,
    notes: req.body.notes,
  };

  var data = new TouristData(item);
  data.save();

  res.redirect('/');
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
