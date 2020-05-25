import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import {
    Button,
    ButtonGroup,
    Table,
     Alert
} from 'reactstrap';
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
        clicked: []
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
                this.forceUpdate();
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
        // alert(`${event.target.name} grade changed to: ${event.target.value}.`)
        this.setState({
            arr: this.state.clicked.push(`${event.target.getAttribute("subject")}${event.target.name}`)
        })
        this.getStudentsAndUpdate()
    }
    gradeStudentM = event => {
        event.preventDefault();
        this.props.gradeStudentM(event.target.id, event.target.name, event.target.value, event.target.getAttribute("subject"));
        // alert(`${event.target.name} grade changed to: ${event.target.value}.`)
        this.setState({
            arr: this.state.clicked.push(`${event.target.getAttribute("subject")}${event.target.name}`)
        })
        this.getStudentsAndUpdate()
    }
    viewStudent = event => {
        event.preventDefault();
        this.props.viewStudent(event.target.id, event.target.name);
        this.props.history.push("/print-chart");
    }
    render() {
        return (
            this.props.student.view_student.sdata ?
                <>
                    <h1 style={{ textAlign: "center",marginTop:10 }}>{this.props.student.view_student.sdata.firstName} {this.props.student.view_student.sdata.lastName}</h1>
                    <ViewStudentDropdown
                        handleInputChange={this.handleInputChange}
                        view_subject={this.props.view_subject}
                        view_student={this.props.student.view_student}
                    />
                    {
                        this.props.student.view_student.sdata.grades.map((subject, index) => subject.title === this.state.view_subject && subject.assignments ? (
                            <div style={{ height: "85vh" }} className="table-responsive" key={`${subject.title}${index}`}>
                                <Button color="warning" style={{ display: "block", textAlign: "center", marginTop: 50, marginBottom: 50, float: "right", marginRight: 50 }} key={this.props.student.view_student.sdata._id} name={subject.title} onClick={this.viewStudent} id={this.props.student.view_student.sdata._id}>Spreadsheet</Button>
                                <Table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{ padding: 0 }}>Assignment</th>
                                            <th style={{ padding: 0 }}>November grade</th>
                                            <th style={{ padding: 0 }}> May grade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subject.assignments.map((assignment, index) =>
                                            <tr key={`${assignment._id}${index}`}>
                                                {!this.state.clicked.includes(`${subject.title}${assignment.title}`) ?
                                                    <>
                                                        <td>{assignment.title}</td>
                                                        <td>
                                                            <Alert color="info">November grade: {assignment.gradeN}</Alert>
                                                            <ButtonGroup>
                                                                <Button color="info" onClick={this.gradeStudentN} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={"L"} >L</Button>
                                                                <Button color="info" onClick={this.gradeStudentN} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={"P"}>P</Button>
                                                                <Button color="info" onClick={this.gradeStudentN} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={"M"}>M</Button>
                                                                <Button color="info" onClick={this.gradeStudentN} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={null} >X</Button>
                                                            </ButtonGroup>
                                                        </td>
                                                        <td>
                                                            <Alert color="info">May grade: {assignment.gradeM}</Alert>
                                                            <ButtonGroup>
                                                                <Button color="info" onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={"L"} >L</Button>
                                                                <Button color="info" onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={"P"}>P</Button>
                                                                <Button color="info" onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={"M"}>M</Button>
                                                                <Button color="info" onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={null} >X</Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </>
                                                    :
                                                    <>
                                                        <td>{assignment.title}</td>
                                                        <td>
                                                            <Alert color="warning">November grade: {assignment.gradeN}</Alert>
                                                            <ButtonGroup className={`${subject.title}${assignment.title}`}>
                                                                <Button color="warning" onClick={this.gradeStudentN} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={"L"} >L</Button>
                                                                <Button color="warning" onClick={this.gradeStudentN} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={"P"}>P</Button>
                                                                <Button color="warning" onClick={this.gradeStudentN} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={"M"}>M</Button>
                                                                <Button color="warning" onClick={this.gradeStudentN} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={null} >X</Button>
                                                            </ButtonGroup>
                                                        </td>
                                                        <td>
                                                            <Alert color="warning">May grade: {assignment.gradeM}</Alert>
                                                            <ButtonGroup className={`${subject.title}${assignment.title}`}>
                                                                <Button color="warning" onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={"L"} >L</Button>
                                                                <Button color="warning" onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={"P"}>P</Button>
                                                                <Button color="warning" onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={"M"}>M</Button>
                                                                <Button color="warning" onClick={this.gradeStudentM} id={this.props.student.view_student.sdata._id} subject={subject.title} type="button" name={assignment.title} value={null} >X</Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </>
                                                }
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