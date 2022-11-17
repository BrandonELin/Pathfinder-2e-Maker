const mongoose = require('mongoose')

const Schema = mongoose.Schema

const characterSchema = new Schema({ 
    user: { type: String, required: true },
    name: { type: String, required: true },
    ancestry: { type: String, required: true },
    background: { type: String, required: true },
    class: { type: String, required: true }
})

const CharacterModel = mongoose.model('Characters', characterSchema)

module.exports = CharacterModel