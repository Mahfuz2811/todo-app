import React from 'react';

function TodoSingleList({ todo, index, updateTodo, deleteTodo }) {
    return (
        <div className="row mr-bottom-18">
            <div className="content-body">
                <input className="form-check-input wh-50"
                       type="checkbox"
                       checked={todo.is_completed}
                       onChange={() => updateTodo(todo.id)}/>
                <div
                    className="d-flex flex-column justify-content-center w-82 height-50 title mr-left-13 overflow-x-auto">
                    <span>{ todo.task_name }</span>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center wh-50 icon mr-left-13 cursor"
                        onClick={() => deleteTodo(index)}>
                    <span>x</span>
                </div>
            </div>
        </div>
    )
}

export default TodoSingleList;
