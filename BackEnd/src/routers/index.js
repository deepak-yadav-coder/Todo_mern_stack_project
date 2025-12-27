const express = require('express');
const router = express.Router();

const todo_routers = require('./todo')
const user_routers = require('./user')

router.use('/', todo_routers)
router.use('/', user_routers)

module.exports = router
