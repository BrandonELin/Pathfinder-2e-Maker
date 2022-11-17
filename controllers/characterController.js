const CharacterModel = require('../models/Character')

const index = async (req, res) => {
    try {
        const foundCurrentUsersCharacters = await CharacterModel.find({ user: req.user })
        console.log(req.user)
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

const deleteCharacter = async (req, res) => {
    try {
        const deleteUsersCharacter = await CharacterModel.findByIdAndDelete(req.params.id) // req.body -->  { notes: '', user: '' }
        res.status(200).json({ character: deleteUsersCharacter })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const editCharacter = async (req, res) => {
    try {
        const editCharacter = await CharacterModel.findById(req.params.id)
        res.status(200).json({ character: editCharacter })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateOneCharacter = async (req, res) => {
    try {
        const updateUsersCharacter = await CharacterModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ character: updateUsersCharacter })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    index, 
    add,
    deleteCharacter,
    updateOneCharacter,
    editCharacter
}