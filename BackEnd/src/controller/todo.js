const Todo = require('../../model/todo_model');
const { handleSuccess, handleError } = require('../handle_response');


const createTodo = async (req, res) => {
    const reqData = req.body;
    const validateTodo = new Todo({
        text: reqData.text,
        completed: reqData.completed
    })
    try {
        const newTodo = await validateTodo.save()
        console.log('inside createTodo...', newTodo);
        handleSuccess(res, newTodo, 201, 'success')

    } catch (err) {
        handleError(res, err, 400, 'Error')
    }
}

const updateTodo = async (req, res) => {

    try {
        const getUserTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        handleSuccess(res, getUserTodo, 202, 'updated successfully')
    } catch (error) {
        console.log(error)
        handleError(res, error, 400, 'something went wrong during updation.')

    }
}

const getTodo = async (req, res) => {

    try {
        const getData = await Todo.find();

        handleSuccess(res, getData, 201);
    } catch (err) {
        handleError(res, err, 400);
    }
}

const deleteTodo = async (req, res) => {
    try {

        const deleteUserTodo = await Todo.findByIdAndDelete(req.params.id, req.body, {
            new: true
        })

        handleSuccess(res, deleteUserTodo, 202, 'deleted successfully')
    } catch (error) {
        console.log(error)
        handleError(res, error, 400, 'something went wrong during deletion.')

    }
}

module.exports = {

}

module.exports = {
    createTodo,
    updateTodo,
    getTodo,
    deleteTodo
}