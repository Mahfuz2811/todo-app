import React from 'react';
import { Navbar } from 'react-bootstrap';

function TodoHeader() {
    return (
        <Navbar bg="light" className="bg-blue">
            <div className="header-title mx-auto white">To-Do App</div>
        </Navbar>
    )
}

export default TodoHeader;
