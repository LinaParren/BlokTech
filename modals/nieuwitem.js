const mongoose = require('mongoose')

const nieuwCafe = new mongoose.Schema({
    identifier: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const Cafe = mongoose.model('Cafe', nieuwCafe)
module.exports = Cafe
