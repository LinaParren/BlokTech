// Roep alle geinstalleerde onderdelen aan
const express = require("express")
const router = express.Router();
const User = require("../models/users");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// Dit hebben we nodig voor het wachtwoord
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Zorg dat er een sessie is
let session;

// Dit zorgt ervoor dat de gebruiker in kan loggen
router.post("/login", async (req, res) => {
  try {
    const getUser = await User.findOne({
      gebruikersnaam: req.body.gebruikersnaam
    });
    if (getUser) {
      // Vergelijk of het wachtwoord overeenkomt met de database
      const comparePassword = await bcrypt.compare(req.body.password, getUser.password);
      if (comparePassword) {
        // Inloggen gelukt, laat weten in de terminal en verbind door naar profiel
        console.log("Succesvol ingelogd!");
        // Start sessie voor ingelogd account
        session = req.session;
        session.gebruikersnaam = req.body.gebruikersnaam;
        return res.status(200).redirect('/profiel');
      } else {
        // Inloggen niet gelukt, laat weten in de terminal en laat opnieuw proberen
        console.error("Verkeerde gebruikersnaam of wachtwoord!");
        return res.status(404).redirect('/');
      }
    } else {
      console.error("Verkeerde gebruikersnaam of wachtwoord!");
      return res.status(404).redirect('/');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).redirect('/');
  }
});

// Dit zorgt ervoor dat de gebruiker een account aan kan maken
router.post('/aangemaakt', async (req, res) => {
  // Zorg dat het wachtwoord vergrendeld wordt
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  // Maak een nieuw account aan door deze gegevens in te vullen
  const createUser = new User({
    voornaam: req.body.voornaam,
    achternaam: req.body.achternaam,
    gebruikersnaam: req.body.gebruikersnaam,
    email: req.body.email,
    password: hashedPassword
  });
  createUser.save((error) => {
    if (error) {
      // Account aanmaken niet gelukt, laat weten in de terminal en laat opnieuw proberen
      console.error(error);
      return res.status(500).redirect('/accountmaken');
    } else {
      // Account aanmaken gelukt, laat weten in de terminal en verbind door naar profiel
      console.log("Account aangemaakt!")
      // Start sessie voor aangemaakt account
      session = req.session;
      session.gebruikersnaam = req.body.gebruikersnaam;
      return res.status(200).redirect('/profiel');
    }
  });
});

// Laat account uitloggen door sessie te stoppen
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
  console.log("Uitgelogd!")
});

// Verwijder account uit de database en stop sessie
router.post('/verwijderen', (req, res) => {
  session = req.session;
  console.log(session.gebruikersnaam)
  User.find({
    gebruikersnaam: session.gebruikersnaam
  }).deleteOne().exec();
  session.destroy();
  res.redirect('/');
});

// Dit zorgt ervoor dat de gebruiker het account aan kan passen
router.post('/gewijzigd', (req, res) => {
  session = req.session;
  User.updateOne({
    gebruikersnaam: session.gebruikersnaam
  }, {
    voornaam: req.body.voornaam,
    achternaam: req.body.achternaam,
    gebruikersnaam: req.body.gebruikersnaam,
    email: req.body.email
  }).exec();
  session.gebruikersnaam = req.body.gebruikersnaam;
  res.redirect('/profiel');
})

module.exports = router;