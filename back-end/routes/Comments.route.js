const express = require('express')
const router = express.Router()
const CommentsController = require('../controllers/Comments.controller')

router.post('/comments', CommentsController.set)
router.get('/comments', CommentsController.get)

module.exports = router