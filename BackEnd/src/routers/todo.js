const express = require('express');
const router = express.Router();
const {
    createTodo,
    updateTodo,
    getTodo,
    deleteTodo
} = require('../controller/todo');

router.post('/create-todo', createTodo);
router.get('/get-todo', getTodo);
router.put('/update-todo/:id', updateTodo);
router.delete('/delete-todo/:id', deleteTodo);

module.exports = router