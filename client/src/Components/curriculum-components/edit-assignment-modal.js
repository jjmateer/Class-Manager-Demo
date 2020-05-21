import React, { useState } from "react";
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



const EditAssignmentModal = (props) => {
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    return (
        <>
            <Button color="warning" onClick={togglemodal}>Edit</Button>
            <Modal isOpen={modal} toggle={togglemodal}>
                <Form onSubmit={props.editAssignment} name={props.subjecttitle} assignment={props.assignment.title}>
                    <ModalHeader toggle={togglemodal}>Edit</ModalHeader>
                    <Input onChange={props.handleInputChange} id="newAssignmentName" required />
                    <Button color="success" type="submit" style={{ margin: 10 }} >Submit</Button>
                </Form>
            </Modal>
        </>
    );
}

export default EditAssignmentModal;