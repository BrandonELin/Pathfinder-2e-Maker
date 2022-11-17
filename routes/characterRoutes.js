const express = require('express')
const router = express.Router()
const characterCtrl = require('../controllers/characterController')

router.get('/index', characterCtrl.index)
router.post('/add', characterCtrl.add)
router.delete('/:id/delete', characterCtrl.deleteCharacter)
router.put('/:id/edit', characterCtrl.editCharacter)

module.exports = router