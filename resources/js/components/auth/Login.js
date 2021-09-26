import React, {useState} from "react";

import {Modal, Button} from "react-bootstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import {closeLoginModal} from "../../redux/actions/auth";
import {login} from "../../redux/actions/auth";

function LoginModal() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const show = useSelector(store => store.login.loginModalShow);
    const loginError = useSelector(store => store.login.loginError);
    const message = useSelector(store => store.login.message);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeLoginModal());
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        loginError ? <p className="text-center alert-danger">{message}</p> : null
                    }
                    <div>
                        <p>Email: mahfuz@gmail.com</p>
                        <p>password: password</p>
                    </div>
                    <div className="row">
                        <form onSubmit={handleLogin}>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           onChange={handleEmail}
                                           name="email"
                                           id="email"
                                           autoComplete="NoAutocomplete"/>
                                </div>
                            </div>
                            <div className="form-group row mr-top-10">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password"
                                           className="form-control"
                                           onChange={handlePassword}
                                           name="password"
                                           id="password"
                                           autoComplete="NoAutocomplete"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" onClick={handleLogin}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
};

export default connect(mapStateToProps, {
    login
})(LoginModal);
