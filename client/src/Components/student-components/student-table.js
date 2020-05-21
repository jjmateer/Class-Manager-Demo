import React from "react";
import {
    ButtonGroup,
    Button,
    Table
} from 'reactstrap';
import EditStudentModal from "./edit-student-modal";
import "./student.css";
import VerifyDeleteModal from "./verify-delete-modal";
import ViewStudent from "./view-student";
import { Link } from "react-router-dom";



const StudentTable = React.memo((props) => {
    return (
        <div className="table-responsive">
            <Table className="table">
                <thead>
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {props.students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.lastName}</td>
                            <td>{student.firstName}</td>
                            <td>
                                <ButtonGroup>
                                    {/* <ViewStudent
                                        viewStudent={props.viewStudent}
                                        viewStudentRC={props.viewStudentRC}
                                        gradeStudentN={props.gradeStudentN}
                                        gradeStudentM={props.gradeStudentM}
                                        view_subject={props.view_subject}
                                        handleInputChange={props.handleInputChange}
                                        student={student}
                                    /> */}
                                    <Button color="info" key={student._id} onClick={props.viewStudentRC} id={student._id}>Grades</Button>

                                    <EditStudentModal
                                        id={student._id}
                                        handleInputChange={props.handleInputChange}
                                        updateStudentInfo={props.updateStudentInfo}
                                        error={props.error}
                                    />
                                    <VerifyDeleteModal
                                        id={student._id}
                                        handleInputChange={props.handleInputChange}
                                        deleteStudent={props.deleteStudent}
                                        error={props.error}
                                    />
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
});

export default StudentTable;