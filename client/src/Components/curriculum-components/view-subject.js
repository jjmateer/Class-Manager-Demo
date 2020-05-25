import React from 'react';
import {
    Table
} from 'reactstrap';
import VerifyDeleteAssignmentModal from "./verify-delete-assignment-modal";


const ViewSubject = (props) => {

    const { assignments } = props.subjectinfo
    return (
        <>
            <div style={{ flexDirection: "row" }}>
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
                                        </td>
                                    </tr>
                                )
                            }) : null}
                    </thead>
                </Table>
            </div>
        </>
    );
}

export default ViewSubject;