import React, { useEffect, useState } from "react";
import axios from 'axios'
function Home() {

    const [Todos, setTodos] = useState([])
    const [Error, setError] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [newTodo, setNewtodo] = useState('')

    useEffect(() => {
        const getTodos = async () => {
            try {
                setLoading(true)
                const getData = await axios.get('http://localhost:5001/api/get-todo', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setTodos(getData.data.data)
                setError(null)
            } catch (error) {
                setError('failed to fetch Todos.')
            } finally {
                setLoading(false)
            }
        }
        getTodos()
    }, [])
    const todoCreate = async () => {
        try {
            if (!newTodo) return

            const getData = await axios.post('http://localhost:5001/api/create-todo', {
                text: newTodo,
                completed: false
            }, {
                withCredentials: true,
            })
            setTodos([...Todos, getData.data.data])
            setNewtodo('')
        } catch (error) {
            setError('failed to create todo.')
        }
    }

    const todoStatus = async (id) => {
        const Todo = Todos.find(t => t._id == id)
        try {
            const updateTodo = await axios.put(`http://localhost:5001/api/update-todo/${id}`, {
                ...Todo,
                completed: !Todo.completed
            }, {
                withCredentials: true
            })
            setTodos(Todos.map(t => t._id === id ? updateTodo.data.data : t))
        } catch (error) {
            setError('failed to update todo status.')
        }
    }

    const todoDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/delete-todo/${id}`, {
                withCredentials: true
            })
            setTodos(Todos.filter(t => t._id !== id))
        } catch (error) {
            setError('failled to Delete Todo.')
        }
    }
    let completedTodo = Todos.filter(todo => !todo.completed).length
    return (
        <>
            <div className="container">
                <h1>Todo App</h1>
                <div>
                    <input type='text'
                        value={newTodo} onInput={e => setNewtodo(e.target.value)}
                        onKeyPress={e => e.key === "Enter" && todoCreate()}
                        placeholder="add a new todo..." />
                    <button id='add'
                        onClick={todoCreate}
                    >Add</button>
                </div>
                <ul>
                    {Todos.map((todo, index) => (
                        <li key={index} id='multiple'>
                            <div id='dual'>
                                <input type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => todoStatus(todo._id)}
                                />
                                <span
                                    style={{
                                        color: todo.completed ? 'grey' : 'black',
                                        textDecoration: todo.completed ? 'line-through' : 'none'
                                    }}> {todo.text} </span>
                            </div>
                            <button id='delete' onClick={() => todoDelete(todo._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <p>{completedTodo} Todo remaining</p>
                <button id='logout'
                    // onClick={logout}
                >Logout</button>
            </div>
        </>
    )
}

export default Home;