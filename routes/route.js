const express = require('express');
const router = express.Router();

let session;

router.get('/', (req, res) => {
  session = req.session;
  if (!session.gebruikersnaam) {
      res.redirect('verkennen');
  } else {
      res.render('zoeken');
  }
});

router.get('/home', (req, res) => {
  res.render('home');
});

router.get('/', (req, res) => {
  res.render('start');
});

router.get('/zoeken', (req, res) => {
  res.render('zoeken');
});

router.get('/verkennen', (req, res) => {
  res.render('verkennen');
});

// router.get('/lijst', (req, res) => {
//   res.render('lijst');
// });

module.exports = router;
