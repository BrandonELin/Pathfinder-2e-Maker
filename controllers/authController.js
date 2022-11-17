const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
}


const register = async (req, res) => {

    try {
        const foundUser = await User.findOne({ username: req.body.username })

        if (foundUser) {
            return res.status(400).json({ error: 'User already exists' })
        }


        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await User.create({ ...req.body, password: encryptedPassword })

        const payload = { id: newUser._id, user: newUser.username }
        const token = createToken(payload)

        res.status(200).json({ token })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

const login = async (req, res) => {

    try {

        const foundUser = await User.findOne({ username: req.body.username })

        if (!foundUser) {
            return res.status(404).json({ error: 'No such user exists' })
        }

        const validPass = await bcrypt.compare(req.body.password, foundUser.password)

        if (!validPass) {
            return res.status(403).json({ error: 'Invalid credentials '})
        }

        const payload = { id: foundUser._id, user: foundUser.username }
        const token = createToken(payload)

        res.status(200).json({ token })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    register,
    login
}