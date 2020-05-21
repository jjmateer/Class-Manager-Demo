import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    Form,
    Label,
    Input,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';



const AddAssignment = (props) => {
    console.log(props.subject)
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <>
            <Button color="success" style={{ width: "50%", margin: "auto" }} onClick={togglemodal}>Add</Button>
            <Modal isOpen={modal} toggle={togglemodal}>
                <ModalHeader toggle={togglemodal}>New assignment</ModalHeader>
                <Form style={{ padding: 20 }} id={props.title} onSubmit={props.addAssignment}>
                    <Label for="Title">Title</Label>
                    <Input onChange={props.handleInputChange} type="title" id="titleAdd" required />
                    <Label for="Title">Position: </Label>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>
                            {props.newAssignmentIndex}
                        </DropdownToggle>
                        <DropdownMenu>
                            {props.subject.assignments.map((subject, index) => {
                                return (
                                    <DropdownItem key={`subject.title${index}`} onClick={props.handleInputChange} id="newAssignmentIndex" value={index}>{index}
                                    </DropdownItem>
                                )
                            })}
                            <DropdownItem onClick={props.handleInputChange} id="newAssignmentIndex" value={props.subject.assignments.length + 1}>Bottom
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button color="success" style={{ marginTop: 20 }} id={props.title} onClick={togglemodal} type="submit">Submit</Button>
                </Form>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default AddAssignment;