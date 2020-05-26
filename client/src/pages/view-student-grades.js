import React, { Component} from "react";
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
        gradeLetters: ["L", "M", "P"],
        clickedColorChangeM: [],
        clickedColorChangeN: [],
        updateStudent: false
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
    getStudentsAndUpdate = () => {
        setTimeout(
            function () {
                this.props.getStudents();
            }
                .bind(this),
            10
        );
    }
    handleInputChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };
    gradeStudentN = event => {
        event.preventDefault();
        this.props.gradeStudentN(event.target.id, event.target.name, event.target.value, event.target.getAttribute("subject"));
        this.setState({
            arr: this.state.clickedColorChangeN.push(`${event.target.getAttribute("subject")}${event.target.name}${event.target.getAttribute("value")}/November`)
        })
    }
    gradeStudentM = event => {
        event.preventDefault();
        this.props.gradeStudentM(event.target.id, event.target.name, event.target.value, event.target.getAttribute("subject"));
        this.setState({
            arr: this.state.clickedColorChangeM.push(`${event.target.getAttribute("subject")}${event.target.name}${event.target.getAttribute("value")}/May`)
        })
        this.getStudentsAndUpdate()
    }

    viewStudent = event => {
        event.preventDefault();
        this.props.viewStudent(event.target.id, event.target.name);
        this.props.history.push("/print-chart");
    }

    confirmGrades = event => {
        this.setState({
            clickedColorChangeM: [],
            clickedColorChangeN: []
        })
        alert("Grades confirmed")
        this.props.history.push("/students");
    }
    render() {
        return (

            this.props.student.view_student.sdata ?
                <>
                    <h1 style={{ textAlign: "center", marginTop: 10 }}>{this.props.student.view_student.sdata.firstName} {this.props.student.view_student.sdata.lastName}</h1>
                    <ViewStudentDropdown
                        handleInputChange={this.handleInputChange}
                        view_subject={this.props.view_subject}
                        view_student={this.props.student.view_student}
                    />
                    {
                        this.props.student.view_student.sdata.grades.map((subject, index) => subject.title === this.state.view_subject && subject.assignments ? (
                            <div style={{ height: "85vh" }} className="table-responsive" key={`${subject.title}${index}`}>
                                
                                <Button color="warning" key={this.props.student.view_student.sdata._id} name={subject.title} onClick={this.viewStudent} id={this.props.student.view_student.sdata._id}>Spreadsheet</Button>
                                <Button onClick={this.confirmGrades}>Confirm</Button>
                                <Table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{ padding: 0 }}>Assignment</th>
                                            <th style={{ padding: 0 }}>Current grades</th>
                                            <th style={{ padding: 0 }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subject.assignments.map((assignment, index) =>
                                        
                                            <tr key={`${assignment._id}${index}`}>
                                                <>
                                                    <td>{assignment.title}</td>
                                                    <td>
                                                        <Alert color="info">November grade: {assignment.gradeN} {this.state.updateStudent === true ? assignment.gradeN : null}</Alert>
                                                        <GradeDropdown
                                                        gradeStudentN={this.props.gradeStudentN}
                                                        subjectTitle={subject.title}
                                                        assignmentTitle={assignment.title}
                                                        gradeLetters={this.state.gradeLetters}
                                                        clickedColorChangeN={this.state.clickedColorChangeN}
                                                        studentID={this.props.student.view_student.sdata._id}
                                                        />
                                                        {/* <ButtonGroup data-toggle="button">
                                                            {this.state.gradeLetters.map((letter, index) => (
                                                                !this.state.clickedColorChangeN.includes(`${subject.title}${assignment.title}${letter}/November`) ?
                                                                    <Button color="info" key={`${subject.title}${assignment.title}${letter}/November`} onClick={this.gradeStudentN} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={letter} >{letter}</Button>
                                                                    :
                                                                    this.state.clickedColorChangeN[this.state.clickedColorChangeN.length - 1] == `${subject.title}${assignment.title}${letter}/November` ?
                                                                        <Button color="warning" key={`${subject.title}${assignment.title}${letter}/November`} onClick={this.gradeStudentN} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={letter} >{letter}</Button>
                                                                        :
                                                                        <Button color={this.state.clickedColorChangeN.includes(`${subject.title}${assignment.title}${letter}/November`) ? "warning" : "info"} key={`${subject.title}${assignment.title}${letter}/November`} onClick={this.gradeStudentN} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={letter} >{letter}</Button>

                                                            ))}
                                                            {!this.state.clickedColorChangeN.includes(`${subject.title}${assignment.title}null/November`) ?
                                                                <Button color="info" onClick={this.gradeStudentN} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={null} >X</Button>
                                                                :
                                                                this.state.clickedColorChangeN[this.state.clickedColorChangeN.length - 1] == `${subject.title}${assignment.title}null/November` ?
                                                                    <Button color="warning" onClick={this.gradeStudentN} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={null} >X</Button>
                                                                    :
                                                                    <Button color={this.state.clickedColorChangeN.includes(`${subject.title}${assignment.title}null/November`) ? "warning" : "info"} onClick={this.gradeStudentN} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={null} >X</Button>
                                                            }
                                                        </ButtonGroup> */}
                                                    </td>
                                                    <td>
                                                        <Alert color="info">May grade: {assignment.gradeM}</Alert>
                                                        <ButtonGroup>
                                                            {this.state.gradeLetters.map((letter, index) => (
                                                                !this.state.clickedColorChangeM.includes(`${subject.title}${assignment.title}${letter}/May`) ?
                                                                    <Button color="info" key={`${subject.title}${assignment.title}${letter}/May`} onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={letter} >{letter}</Button>
                                                                    :
                                                                    this.state.clickedColorChangeM[this.state.clickedColorChangeM.length - 1] == `${subject.title}${assignment.title}${letter}/May` ?
                                                                        <Button color="success" key={`${subject.title}${assignment.title}${letter}/May`} onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={letter} >{letter}</Button>
                                                                        :
                                                                        this.state.clickedColorChangeM.includes(`${subject.title}${assignment.title}${letter}/May`) ?
                                                                            <Button color="warning" key={`${subject.title}${assignment.title}${letter}/May`} onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={letter} >{letter}</Button>
                                                                            :
                                                                            <Button color="info" key={`${subject.title}${assignment.title}${letter}/May`} onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={letter} >{letter}</Button>

                                                            ))}
                                                            {!this.state.clickedColorChangeM.includes(`${subject.title}${assignment.title}null/May`) ?
                                                                <Button color="info" onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={null} >X</Button>
                                                                :
                                                                this.state.clickedColorChangeM[this.state.clickedColorChangeM.length - 1] == `${subject.title}${assignment.title}null/May` ?
                                                                    <Button color="success" onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={null} >X</Button>
                                                                    :
                                                                    this.state.clickedColorChangeM.includes(`${subject.title}${assignment.title}null/May`) ?
                                                                        <Button color="warning" onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={null} >X</Button>
                                                                        :
                                                                        <Button color="info" onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={null} >X</Button>
                                                            }
                                                        </ButtonGroup>
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