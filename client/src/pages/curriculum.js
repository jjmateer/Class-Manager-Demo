import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import {
    createCurriculum,
    getSubjects,
    addAssignment,
    deleteSubject,
    viewSubject,
    deleteAssignment,
    editAssignment
} from "../actions/curriculum-actions";
import { getStudents, viewStudent } from "../actions/student-actions";
import { Link } from "react-router-dom";
import AddAssignment from "../Components/curriculum-components/add-assignment-form";
import {
    Button,
    ButtonGroup,
    Spinner,
} from 'reactstrap';
import CreateCirriculum from "../Components/curriculum-components/create-curriculum-form";
import ViewSubject from "../Components/curriculum-components/view-subject";
import VerifyDeleteModal from "../Components/curriculum-components/verify-delete-modal";


class Curriculum extends Component {
    state = {
        title: "",
        titleAdd: "",
        newAssignmentName: "",
        newAssignmentIndex: 0
    };
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired,
        student: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        createCurriculum: PropTypes.func.isRequired,
        getSubjects: PropTypes.func.isRequired,
        curriculum: PropTypes.object.isRequired,
        deleteAssignment: PropTypes.func.isRequired,
        addAssignment: PropTypes.func.isRequired,
        deleteSubject: PropTypes.func.isRequired,
        getStudents: PropTypes.func.isRequired,
        viewStudent: PropTypes.func.isRequired,
        editAssignment: PropTypes.func.isRequired
    }
    componentDidMount = () => {
        this.props.clearErrors();
        this.props.getSubjects();
    }

    getSubjectsAndUpdate = () => {
        setTimeout(
            function () {
                this.props.getSubjects();
                // this.forceUpdate();
            }
                .bind(this),
            10
        );
    }
    handleInputChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    createCurriculum = event => {
        event.preventDefault();
        this.props.createCurriculum(this.state.title);
        this.getSubjectsAndUpdate();
        window.location.reload();
        console.log(`Adding subject: ${this.state.title}`)

    }

    addAssignment = event => {
        event.preventDefault();
        this.props.addAssignment(event.target.id, this.state.titleAdd, this.state.newAssignmentIndex)
        // this.props.history.push("/curriculum")
        window.location.reload();
        this.getSubjectsAndUpdate();
    }

    editAssignment = event => {
        event.preventDefault();
        this.props.editAssignment(event.target.name, event.target.getAttribute("assignment"), this.state.newAssignmentName);
        this.getSubjectsAndUpdate();
    }

    deleteSubject = event => {
        event.preventDefault();
        this.props.deleteSubject(event.target.id, event.target.value)
        this.getSubjectsAndUpdate();
        window.location.reload();
    }

    deleteAssignment = event => {
        event.preventDefault();
        this.props.deleteAssignment(event.target.id, event.target.name);
        this.getSubjectsAndUpdate();
    }

    viewSubject = event => {
        event.preventDefault();
        this.props.viewSubject(event.target.id);
        this.props.history.push("/print-chart-all");
    }


    render() {
        const { subjects } = this.props.curriculum;
        return (
            <>
                <h1 className="page-header">Subjects</h1>
                <CreateCirriculum
                    createCurriculum={this.createCurriculum}
                    handleInputChange={this.handleInputChange}
                    error={this.props.error}
                />
                {!this.props.curriculum.isLoading ?
                    <div className="accordion" id="accordion" style={{ marginTop: 75 }}>
                        {subjects.map((subject, index) => (
                            <div className="card" key={`${subject._id}${index}1`}>
                                <div className="card-header" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="false" aria-controls={`#collapse${index}`}>
                                            {subject.title}
                                        </button>
                                    </h2>
                                </div>

                                <div id={`collapse${index}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div className="card-body" style={{overflow:"auto"}}>
                                        <ButtonGroup style={{ marginBottom: 25 }}>
                                            <Button tag={Link} color="info" to="/print-chart-all" id={subject.title} onClick={this.viewSubject} style={{ width: "100%", margin: "auto" }}>Spreadsheet</Button>
                                            <AddAssignment
                                                title={subject.title}
                                                addAssignment={this.addAssignment}
                                                handleInputChange={this.handleInputChange}
                                                subject={subject}
                                                newAssignmentIndex={this.state.newAssignmentIndex}
                                            />
                                            <VerifyDeleteModal
                                                subject={subject}
                                                deleteSubject={this.deleteSubject}
                                            />
                                        </ButtonGroup>
                                        <ViewSubject
                                            getSubjects={this.props.getSubjects}
                                            viewStudent={this.props.viewStudent}
                                            student={this.props.student}
                                            subjecttitle={subject.title}
                                            subjectinfo={subject}
                                            viewSubject={this.viewSubject}
                                            deleteAssignment={this.deleteAssignment}
                                            editAssignment={this.editAssignment}
                                            handleInputChange={this.handleInputChange}
                                            newAssignmentIndex={this.state.newAssignmentIndex}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    : <div style={{ margin: "auto", width: 50 }}><Spinner type="grow" color="primary" /></div>}
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,
    curriculum: state.curriculum,
    student: state.student,
    error: state.error
})

export default connect(
    mapStateToProps,
    {
        clearErrors,
        loadUser,
        createCurriculum,
        getSubjects,
        addAssignment,
        deleteSubject,
        getStudents,
        viewStudent,
        viewSubject,
        deleteAssignment,
        editAssignment
    }
)(Curriculum);