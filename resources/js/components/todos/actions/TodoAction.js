import React from 'react';
import { Row } from "react-bootstrap";

import ActionButton from "./ActionButton";

function TodoAction({ saveTodo, loadAllTodo, clearAllTodo}) {
    return (
        <Row className="mr-top-35">
            <ActionButton title="Save" actionTodo={saveTodo}/>
            <ActionButton title="Load" actionTodo={loadAllTodo}/>
            <ActionButton title="Clear" actionTodo={clearAllTodo}/>
        </Row>
    )
}

export default TodoAction;
