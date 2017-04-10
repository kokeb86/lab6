var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/contactus', function (req, res, next) {
  res.render('contactus', { title: 'Contactus', success: false, errors: {}, csrfToken: req.csrfToken() });
});

router.post('/contactus', function (req, res, next) {
  req.assert('fname', 'Name is Required').notEmpty();
  req.assert('message', 'Message is Required').notEmpty();

  var errors = req.validationErrors();

  console.log(errors);

  if (errors)
    res.render('contactus', { title: 'Contactus', errors: errors, success: false, csrfToken: req.csrfToken() });
  else {
    var body = 'Full Name: ' + req.body.fname + '  ' + 'Type: ' + req.body.type + '  ' + 'Message: ' + req.body.message + 'IP Address '+ req.ip +'\n';

    fs.exists('./data/Contactus.txt', (exists) => {
      if (exists) {
        fs.appendFile('./data/Contactus.txt', body, function (err, data) {
          if (err) throw err;
          console.log(body+'Mesagged appended Done1!');
        });
      } else {
        fs.writeFile('./data/Contactus.txt', body, function (err, data) {
          if (err) throw err;
          console.log('file created and message saving Done!');
        });
      }
           
    });
	//res.redirect('thankyou');
   res.render('thankyou', { title: req.body.fname, errors: errors, success: true, csrfToken: req.csrfToken() });
  }

});

module.exports = router;
