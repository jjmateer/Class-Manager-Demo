import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    FormGroup,
    Nav,
    NavLink,
    Button,
    Modal,
    ModalHeader,
    Form,
    Label,
    Input,
    Spinner,
    Alert
} from 'reactstrap';
import "./style.css";
import { connect } from "react-redux";
import { logout } from "../../actions/auth-actions";



const Navigation = (props) => {
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const togglenav = () => setIsOpen(!isOpen);
    return (
        <>
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={Link} to="/"><i className="fa fa-graduation-cap" aria-hidden="true"></i></NavbarBrand>
                <NavbarToggler onClick={togglenav} />
                <Collapse isOpen={isOpen} navbar>
                    {!props.isAuthenticated ?
                        <Nav className="ml-auto" navbar>
                            {props.isLoading ? <Spinner type="grow" color="primary" /> : <NavLink tag={Link} to="#" onClick={togglemodal}>Login</NavLink>}
                            {props.isLoading ? <Spinner type="grow" color="primary" /> : <NavLink tag={Link} to="/register">Register</NavLink>}
                        </Nav>
                        :
                        <Nav className="ml-auto" navbar>
                            {props.isLoading ? <Spinner type="grow" color="primary" /> : <NavLink tag={Link} to="/students">Students</NavLink>}
                            {props.isLoading ? <Spinner type="grow" color="primary" /> : <NavLink tag={Link} to="/curriculum">Subjects</NavLink>}
                            {props.isLoading ? <Spinner type="grow" color="primary" /> : <NavLink tag={Link} to="/" onClick={props.logout}>Logout</NavLink>}
                        </Nav>
                    }

                </Collapse>
            </Navbar>
            <Modal isOpen={!props.isAuthenticated ? modal : false} toggle={togglemodal}>
                <ModalHeader toggle={togglemodal}>Login</ModalHeader>
                <Form id="loginForm" onSubmit={props.loginSubmit}>
                    {props.error.msg.msg ? <Alert color="danger">{props.error.msg.msg}</Alert> : null}
                    <Label for="Username">Username</Label>
                    <Input className="loginInputs" onChange={props.handleInputChange} type="username" id="user" required />
                    <Label for="Password">Password</Label>
                    <Input className="loginInputs" id="password" onChange={props.handleInputChange} type="password" required />
                    <FormGroup>
                        <Button to="/" style={{ marginTop: 20 }} type="submit">Submit</Button>
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    error: state.error
})

export default connect(
    mapStateToProps,
    { logout }
)(Navigation);