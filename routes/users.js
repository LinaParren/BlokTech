const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

const bcrypt = require('bcrypt');

let session;
router.get('/inloggen', (req, res) => {
    res.render('inloggen');
  });

router.post("/login", async (req, res) => {
    try {
        const getUser = await User.findOne({ gebruikersnaam: req.body.gebruikersnaam });
        if (getUser) {
          const comparePassword = await bcrypt.compare(req.body.password, getUser.password);
          if (comparePassword) {
            console.log("Succesvol ingelogd!");
            session = req.session;
            session.username = req.body.gebruikersnaam;
            return res.status(200).redirect('/verkennen');
          } else {
            console.error("Verkeerde gebruikersnaam of wachtwoord!");
            return res.status(404).redirect('/zoeken');
          }
        } else {
            console.error("Verkeerde gebruikersnaam of password!");
            return res.status(404).redirect('/zoeken');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).redirect('/zoeken');
    }
});


router.get('/accountmaken', (req, res) => {
    res.render('accountmaken');
  });

router.post("/aangemaakt", async (req, res) => {
    const createUser = new User({
        gebruikersnaam: req.body.gebruikersnaam,
        email: req.body.email,
        password: req.body.password
    });
    createUser.save((error) => {
        if (error) {
            console.error(error);
            return res.status(500).redirect('/zoeken');
        } else {
            console.log("Account aangemaakt!")
            return res.status(200).redirect('/verkennen');
        }
    });
});

// router.post('/logout', (req, res) => {
//     req.session.destroy();
//     res.redirect('/inloggen');
// });

module.exports = router;