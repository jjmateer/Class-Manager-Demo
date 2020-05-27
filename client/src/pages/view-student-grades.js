import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import GradeAlert from "../Components/student-components/alert";
import {
    Button,
    ButtonGroup,
    Table,
    Alert
} from 'reactstrap';
import GradeDropdown from "../Components/student-components/grade-dropdown";
import ViewStudentDropdown from "../Components/student-components/view-student-dropdown";
import {
    addStudent,
    getStudents,
    deleteStudent,
    updateStudentInfo,
    viewStudent,
    gradeStudentN,
    gradeStudentM,
    viewStudentRC
} from "../actions/student-actions";

class ViewStudentGrades extends Component {

    state = {
        firstName: "",
        lastName: "",
        view_subject: "",
        errors: {},
        gradeLetters: ["L", "M", "P", null],
        clickedColorChangeM: [],
        clickedColorChangeN: [],
    };
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        addStudent: PropTypes.func.isRequired,
        getStudents: PropTypes.func.isRequired,
        deleteStudent: PropTypes.func.isRequired,
        updateStudentInfo: PropTypes.func.isRequired,
        viewStudent: PropTypes.func.isRequired,
        viewStudentRC: PropTypes.func.isRequired,
        gradeStudentN: PropTypes.func.isRequired,
        gradeStudentM: PropTypes.func.isRequired
    }
    componentDidMount = () => {
        this.props.clearErrors();
        this.props.getStudents();
    }
    handleInputChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    viewStudent = event => {
        event.preventDefault();
        this.props.viewStudent(event.target.id, event.target.name);
        this.props.history.push("/print-chart");
    }

    render() {
        return (

            this.props.student.view_student.sdata ?
                <>
                    <h1 style={{ textAlign: "center", marginTop: 50 }}>
                        {this.props.student.view_student.sdata.firstName} {this.props.student.view_student.sdata.lastName}
                    </h1>
                    <ViewStudentDropdown
                        handleInputChange={this.handleInputChange}
                        view_subject={this.props.view_subject}
                        view_student={this.props.student.view_student}
                    />
                    {
                        this.props.student.view_student.sdata.grades.map((subject, index) => subject.title === this.state.view_subject && subject.assignments ? (
                            <div style={{ height: "85vh" }} className="table-responsive" key={`${subject.title}${index}`}>

                                <Button color="info"
                                    key={this.props.student.view_student.sdata._id}
                                    name={subject.title}
                                    onClick={this.viewStudent}
                                    id={this.props.student.view_student.sdata._id}
                                    style={{ float: "right", marginRight: 50, marginBottom: 25 }}>
                                    Spreadsheet
                                     </Button>
                                <Table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{ padding: 0 }}>Assignment</th>
                                            <th style={{ padding: 0 }}>November</th>
                                            <th style={{ padding: 0 }}>May</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subject.assignments.map((assignment, index) =>

                                            <tr key={`${assignment._id}${index}`}>
                                                <>
                                                    <td>{assignment.title}</td>
                                                    <td>
                                                        <GradeDropdown
                                                            gradeStudentN={this.props.gradeStudentN}
                                                            currentGrade={assignment.gradeN}
                                                            subjectTitle={subject.title}
                                                            assignmentTitle={assignment.title}
                                                            gradeLetters={this.state.gradeLetters}
                                                            studentID={this.props.student.view_student.sdata._id}
                                                            month={"November"}
                                                        />
                                                    </td>
                                                    <td>
                                                        <GradeDropdown
                                                            gradeStudentN={this.props.gradeStudentM}
                                                            currentGrade={assignment.gradeM}
                                                            subjectTitle={subject.title}
                                                            assignmentTitle={assignment.title}
                                                            gradeLetters={this.state.gradeLetters}
                                                            studentID={this.props.student.view_student.sdata._id}
                                                            month={"May"}
                                                            style={{height:100}}
                                                        />
                                                    </td>
                                                </>

                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        ) : null
                        )
                    }
                </>
                : null
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,
    student: state.student,
    error: state.error
})
export default connect(
    mapStateToProps,
    { clearErrors, loadUser, addStudent, getStudents, deleteStudent, updateStudentInfo, viewStudent, gradeStudentN, gradeStudentM, viewStudentRC }
)(ViewStudentGrades);