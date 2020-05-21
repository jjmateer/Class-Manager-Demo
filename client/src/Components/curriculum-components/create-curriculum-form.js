import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    Form,
    Label,
    Input
} from 'reactstrap';


const CreateCirriculum = (props) => {
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    return (
        <>
            <Button color="success" style={{ float:"right", marginRight: "2vw" }} onClick={togglemodal}>Create new subject</Button>
            <Modal isOpen={modal} toggle={togglemodal}>
                <ModalHeader toggle={togglemodal}>New subject</ModalHeader>
                <Form style={{padding:20}} onSubmit={props.createCurriculum}>
                    <Label for="Title">Title</Label>
                    <Input onChange={props.handleInputChange} type="title" id="title" required />
                        <Button style={{ marginTop: 20 }} type="submit" onClick={togglemodal}>Submit</Button>
                </Form>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default CreateCirriculum;