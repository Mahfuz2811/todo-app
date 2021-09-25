import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {connect, Provider, useDispatch, useSelector} from "react-redux";
import Cookies from 'universal-cookie';
import {Row, Col} from "react-bootstrap";
import swal from "sweetalert";

import store from "../redux/store";
import {openLoginModal, logout} from "../redux/actions/auth";

import {EXPIRE_TIME} from "../config/app";
import {getCurrentDateTime} from "../utils/helpers";
import LoginModal from "./auth/Login";
import TodoHeader from "./todos/header/TodoHeader";
import TodoAdd from "./todos/add/TodoAdd";
import TodoList from "./todos/list/TodoList";
import TodoAction from "./todos/actions/TodoAction";
import authAxios from "../utils/axios/authAxios";

function TodoHome() {

    const isAuthenticated = useSelector(store => store.auth.isAuthenticated);

    const cookies = new Cookies();

    const [taskName, setTaskName] = useState('');
    const [todos, setTodos] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {

    }, [todos]);

    const updateTaskName = (event) => {
        setTaskName(event.target.value);
    }

    const addNewTodo = () => {
        if (!taskName) {
            swal('Opps!', 'Enter task name', 'error');
            return;
        }
        let expires = new Date()
        expires.setTime(expires.getTime() + (EXPIRE_TIME * 60 * 1000));
        console.log(expires);
        let cookieTodos = cookies.get('todo') ?? [];
        cookieTodos.push({
            id: Date.now(),
            task_name: taskName,
            is_completed: 0,
            completed_at: null
        });
        cookies.set('todo', cookieTodos, {path: '/', expires});
        setTodos(cookies.get('todo'));
        setTaskName('');
    }

    const loadAllTodo = () => {
        let cookieTodos = cookies.get('todo') ?? [];
        setTodos(cookieTodos);
        console.log(cookies.get('todo'));
    }

    const clearAllTodo = () => {
        cookies.remove('todo');
        let cookieTodos = cookies.get('todo') ?? [];
        setTodos(cookieTodos);
    }

    const updateTodo = (id) => {
        let cookieTodos = cookies.get('todo') ?? [];
        cookieTodos.filter(function (todo) {
            if (todo.id === id) {
                todo['is_completed'] = !todo['is_completed'];
                todo['completed_at'] = todo['is_completed'] ? getCurrentDateTime() : null;
            }

            return todo;
        });

        let expires = new Date()
        expires.setTime(expires.getTime() + (1 * 60 * 1000));
        cookies.set('todo', cookieTodos, {path: '/', expires});
        setTodos(cookies.get('todo'));
    }

    const deleteTodo = (index) => {
        let cookieTodos = cookies.get('todo') ?? [];

        if (cookieTodos.length < index) {
            alert('Index overflow')
        }

        cookieTodos.splice(index, 1);

        let expires = new Date()
        expires.setTime(expires.getTime() + (1 * 60 * 1000));
        cookies.set('todo', cookieTodos, {path: '/', expires});
        setTodos(cookies.get('todo'));
    }

    const saveTodo = () => {
        // save task in database
        if (!isAuthenticated) {
            dispatch(openLoginModal());
            return;
        }

        let todos = cookies.get('todo') ?? [];
        if (todos.length <= 0) {
            swal('Opps!', 'Empty todo', 'error');
            return;
        }

        const payload = {
            todos: todos
        };

        authAxios.post('/api/v1/task/save', payload)
            .then(res => {
                swal('Wow!', 'Task saved successfully', 'success');
            }).finally(() => {
            cookies.remove('todo');
            let cookieTodos = cookies.get('todo') ?? [];
            setTodos(cookieTodos);
        }).catch(error => {
            swal('Opps!', 'Something went wrong', 'error');
        })
    }

    const handleLogout = () => {
        dispatch(logout());
        swal('Thanks', 'Successfully logout', 'success');
    }

    return (
        <>
            <TodoHeader/>
            {
                isAuthenticated ?
                    <div className="pull-right">
                        <a className="logout cursor" onClick={handleLogout}>Logout</a>
                    </div> : null
            }

            <div className="content">
                <Row>
                    <Col md={6} className="max-auto">
                        <TodoAdd addAction={addNewTodo} updateTaskName={updateTaskName}/>
                        <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
                        <TodoAction saveTodo={saveTodo} loadAllTodo={loadAllTodo} clearAllTodo={clearAllTodo}/>
                    </Col>
                </Row>
            </div>
            <LoginModal/>
        </>
    )
}

export default connect(
    openLoginModal,
    logout
)(TodoHome);

if (document.getElementById('example')) {
    ReactDOM.render(
        <Provider store={store}>
            <TodoHome/>
        </Provider>, document.getElementById('example'));
}
