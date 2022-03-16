// Roep express en router aan
const express = require('express');
const router = express.Router();

// Zorg dat er een sessie is
let session;

router.get('/accountmaken', (req, res) => {
  res.render('accountmaken');
});

// Als er sessie is: ga naar profiel, anders: ga naar /
router.get('/', (req, res) => {
  session = req.session;
  if (!session.gebruikersnaam) {
    res.render('inloggen')
  } else {
    res.render('profiel')
  }
});

// Als er sessie is: ga naar verkennen, anders: ga naar /
router.get('/verkennen', (req, res) => {
  session = req.session;
  if (!session.gebruikersnaam) {
    res.redirect('/');
  } else {
    res.render('verkennen');
  }
});

// Als er sessie is: ga naar profiel, anders: ga naar /
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

// Als er sessie is: ga naar wijzigen, anders: ga naar /
router.get('/wijzigen', (req, res) => {
  session = req.session;
  if (!session.gebruikersnaam) {
    res.redirect('/');
  } else {
    res.render('wijzigen');
  }
});

// Als er sessie is: ga naar zoeken, anders: ga naar /
router.get('/zoeken', (req, res) => {
  session = req.session;
  if (!session.gebruikersnaam) {
    res.redirect('/');
  } else {
    res.render('zoeken');
  }
});

module.exports = router;