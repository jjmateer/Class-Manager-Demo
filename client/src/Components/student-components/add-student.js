import React, { useState } from "react";
import {
    FormGroup,
    Button,
    Modal,
    ModalHeader,
    Form,
    Label,
    Input,
    Alert
} from 'reactstrap';
import { connect } from "react-redux";
import { clearErrors } from "../../actions/error-actions";
import { loadUser } from "../../actions/auth-actions";
import "./student.css";


const AddStudent = (props) => {
    console.log(props)
    const togglemodalS = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    return (
        <>
            <Button color="success" style={{ marginRight: "2vw", marginBottom: 30, float: "right" }} onClick={togglemodalS}>Add New Student</Button>
            <div className="add-student-form-wrap">
                <Modal isOpen={modal} toggle={togglemodalS}>
                    <ModalHeader toggle={togglemodalS}>New Student</ModalHeader>
                    <Form className="add-student-form" onSubmit={props.handleFormSubmit}>
                        {props.error.msg.msg ? <Alert color="danger">{props.error.msg.msg}</Alert> : null}
                        {props.student.msg.msg ? <Alert color="success">{props.student.msg.msg}</Alert> : null}
                        <FormGroup>
                            <Label htmlFor="name">First name</Label>
                            <Input required onChange={props.handleInputChange} id="firstName" />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Last name</Label>
                            <Input required onChange={props.handleInputChange} id="lastName" />
                        </FormGroup>
                        <FormGroup>
                            <Button  color="success" className="register-submit-btn" type="submit" >Submit</Button>
                        </FormGroup>
                    </Form>
                </Modal>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,
    error: state.error
})

export default connect(
    mapStateToProps,
    { clearErrors, loadUser }
)(AddStudent);