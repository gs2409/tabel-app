const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    _id: String,
    name: String
})

module.exports = mongoose.model('Contacts', ContactSchema)