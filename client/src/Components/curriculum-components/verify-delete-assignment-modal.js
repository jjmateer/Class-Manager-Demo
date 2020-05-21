import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
} from 'reactstrap';



const VerifyDeleteAssignmentModal = (props) => {
    // console.log(props.subject.title)
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    return (
        <>
            <Button color="danger" onClick={togglemodal}>Delete</Button>
            <Modal isOpen={modal} toggle={togglemodal} backdrop={false}>
                <ModalHeader toggle={togglemodal}>Are you sure?</ModalHeader>
                <Button color="danger" style={{ margin: 10 }}id={props.subjectinfo._id} name={props.assignment.title} onClick={props.deleteAssignment}>Yes</Button>
                <Button style={{ margin: 10 }} onClick={togglemodal}>No</Button>
            </Modal>
        </>
    );
}

export default VerifyDeleteAssignmentModal;