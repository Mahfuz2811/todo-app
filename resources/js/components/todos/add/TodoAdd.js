import React, {useRef} from 'react';

import {Row} from "react-bootstrap";

function TodoAdd({ addAction, updateTaskName }) {

    const inputRef = useRef();

    const handleAction = (event) => {
        event.preventDefault();
        addAction();
        inputRef.current.value = '';
    }

    return (
        <Row>
            <form className="content-header mr-bottom-35" onSubmit={handleAction}>
                <div className="d-flex flex-column justify-content-center w-90 height-50 title">
                    <input type="text" ref={inputRef} placeholder="Task Name" onChange={updateTaskName}/>
                </div>
                <button type="submit"
                    className="d-flex flex-column justify-content-center align-items-center wh-50 icon mr-left-13 cursor border-0"
                    onClick={handleAction}>
                    <span>+</span>
                </button>
            </form>
        </Row>
    )
}

export default TodoAdd;
