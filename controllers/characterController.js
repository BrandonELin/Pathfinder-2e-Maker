const CharacterModel = require('../models/Character')

const index = async (req, res) => {
    try {
        const foundCurrentUsersCharacters = await CharacterModel.find({ user: req.user })
        res.status(200).json({ characters: foundCurrentUsersCharacters })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const add = async (req, res) => {
    try {
        const createdCharacterForCurrentUser = await CharacterModel.create(req.body) // req.body -->  { notes: '', user: '' }
        res.status(200).json({ character: createdCharacterForCurrentUser })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    index, 
    add
}