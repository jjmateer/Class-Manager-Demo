import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    Table
} from 'reactstrap';
import VerifyDeleteAssignmentModal from "./verify-delete-assignment-modal";
import AddAssignment from "./add-assignment-form";
// import EditAssignmentModal from "./edit-assignment-modal";


const ViewSubject = (props) => {
    const togglemodal = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    const { assignments } = props.subjectinfo
    return (
        <>
            <Button color="info" onClick={togglemodal}>View</Button>
            <Modal isOpen={modal} toggle={togglemodal}>
                <ModalHeader toggle={togglemodal}>{props.subjecttitle}</ModalHeader>
                <div style={{flexDirection:"row"}}>
                <Button tag={Link} color="info" to="/print-chart-all" id={props.subjecttitle} onClick={props.viewSubject} style={{ width:"100%",margin:"auto" }}>Spreadsheet</Button>
                {/* <AddAssignment
                    title={props.subjectinfo.title}
                    addAssignment={props.addAssignment}
                    handleInputChange={props.handleInputChange}
                    subject={props.subjectinfo}
                    newAssignmentIndex={props.newAssignmentIndex}
                /> */}
                </div>
                <div className="table-responsive">
                    <Table key={props.subjecttitle}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Assignment</th>
                            </tr>
                            {assignments.length ?
                                assignments.map((assignment, index) => {
                                    return (
                                        <tr key={`${assignment.title}${index}`}>
                                            <td>{index}</td>
                                            <td>
                                                <p>{assignment.title}</p>
                                                <VerifyDeleteAssignmentModal
                                                    assignment={assignment}
                                                    subjectinfo={props.subjectinfo}
                                                    deleteAssignment={props.deleteAssignment}
                                                />
                                                {/* <EditAssignmentModal
                                                    editAssignment={props.editAssignment}
                                                    subjecttitle={props.subjecttitle}
                                                    assignment={assignment}
                                                    handleInputChange={props.handleInputChange}
                                                /> */}
                                            </td>
                                        </tr>
                                    )
                                }) : null}
                        </thead>
                    </Table>
                </div>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ViewSubject;