const express = require('express');
const router = express.Router();
// const User = require("../models/users");

let session;

router.get('/', (req, res) => {
  session = req.session;
  if(!session.gebruikersnaam) {
      res.render('inloggen')
  } else {
      res.render('verkennen')
  }
});

// router.get('/profiel', (req, res) => {
//   session = req.session;
//   if (!session.gebruikersnaam) {
//       res.render('inloggen');
//   } else {
//       User.find({ gebruikersnaam: session.gebruikersnaam }).then((documents) => {
//           let gebruikersnaam = documents.map(user => user.gebruikersnaam);
//           let email = documents.map(user => user.email);
//           res.render('/', {'title': 'Zoeken', gebruikersnaam: gebruikersnaam});
//       });
//   }
// });


router.get('/verkennen', (req, res) => {
  session = req.session;
  if (!session.gebruikersnaam) {
      res.redirect('/');
  } else {
      res.render('verkennen');
  }
});

router.get('/zoeken', (req, res) => {
  res.render('zoeken');
});

router.get('/profiel', (req, res) => {
  session = req.session;
  if (!session.gebruikersnaam) {
      res.redirect('/');
  } else {
      res.render('profiel');
  }
});

router.get('/wijzigen', (req, res) => {
  session = req.session;
  if (!session.gebruikersnaam) {
      res.redirect('/');
  } else {
      res.render('wijzigen');
  }
});

// router.get('/verwijderen', (req, res) => {
//   res.render('verwijderen');
// });

// router.get('/lijst', (req, res) => {
//   res.render('lijst');
// });

module.exports = router;
