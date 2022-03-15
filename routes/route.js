const express = require('express');
const router = express.Router();

let session;

router.get('/', (req, res) => {
  session = req.session;
  if (!session.gebruikersnaam) {
    res.render('inloggen')
  } else {
    res.render('profiel')
  }
});

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
    res.render('profiel', {
      gebruikersnaam: session.gebruikersnaam
    })
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

module.exports = router;