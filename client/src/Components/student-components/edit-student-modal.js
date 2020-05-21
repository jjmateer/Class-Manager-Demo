import React, {useState} from "react";
import {

    FormGroup,
    Button,
    Modal,
    ModalHeader,
    Form,
    Label,
    Input,
    // Spinner,
    Alert
} from 'reactstrap';
import "./student.css";



const EditStudentModal = (props) => {
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    return (
        <>
            <Button color="warning" onClick={togglemodal}>Edit</Button>
            <Modal isOpen={modal} toggle={togglemodal}>
                <ModalHeader toggle={togglemodal}>Edit student info</ModalHeader>
                <Form className="editForm" id={props.id} onSubmit={props.updateStudentInfo}>
                    {props.error.msg.msg ? <Alert color="danger">{props.error.msg.msg}</Alert> : null}
                    <Label for="firstName">First name</Label>
                    <Input className="editInputs" onChange={props.handleInputChange} id="firstName" required />
                    <Label for="lastName">Last name</Label>
                    <Input className="editInputs" onChange={props.handleInputChange} id="lastName" required />
                    <FormGroup>
                        <Button to="/" color="warning" style={{ marginTop: 20 }} id={props.id}>Submit</Button>
                    </FormGroup>
                </Form>
            </Modal>
        </>
    );
}

export default EditStudentModal;