import React from 'react';
import {Col} from "react-bootstrap";

function ActionButton({ title, actionTodo}) {
    return (
        <Col md={2} sm={12} className="mr-bottom-10">
            <div className="d-grid gap-2">
                <button className="btn btn-custom height-50" type="button" onClick={actionTodo}>
                    {title}
                </button>
            </div>
        </Col>
    )
}

export default ActionButton;
