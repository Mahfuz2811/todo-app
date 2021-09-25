import React from 'react';

import TodoSingleList from "./TodoSingleList";

function TodoList({ todos, updateTodo, deleteTodo }) {
    return (
        <>
            {
                todos.map((todo, index) => (
                    <TodoSingleList key={index} index={index} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
                ))
            }
        </>
    )
}

export default TodoList;
