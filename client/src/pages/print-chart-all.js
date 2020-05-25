import React, { Component } from "react";
import PropTypes from "prop-types";
import PrintChartAllDropdown from "../Components/student-components/print-chart-all-dropdown";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import { getStudents } from "../actions/student-actions";
import "../Components/student-components/print-chart.css";


class PrintChartAll extends Component {
    state = {
        month: null
    }
    componentDidMount() {
        this.props.getStudents();
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        getStudents: PropTypes.func.isRequired,
        student: PropTypes.object.isRequired,
        user: PropTypes.object,
        curriculum: PropTypes.object.isRequired
    }
    handleInputChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };
    render() {

        return (
            <>
                <PrintChartAllDropdown
                    handleInputChange={this.handleInputChange}
                    month={this.state.month}
                />
                <div className="table-responsive" id="print-all-table-wrap">
                    <table className="print-chart-table" id="rotate-table" style={{marginTop:200}}>
                        <thead>
                            <tr>
                                <td>{this.props.curriculum.view_subject.title}</td>
                                {this.props.student.students[0] ?
                                    this.props.student.students[0].grades.map((sdt) => (
                                        this.props.curriculum.view_subject.title === sdt.title ?

                                            sdt.assignments.map((sdt2, index) => (
                                                <th id="sideways-title-wrap" key={`${sdt2.title}${index}`}><p style={{ textAlign: "left", paddingLeft: 5 }} id="sideways-title">{sdt2.title}</p></th>
                                            ))

                                            : null
                                    )) : null}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.student.students ?
                                (this.props.student.students.map((sdt, index) => (
                                    <tr key={`${sdt._id}${index}`}>
                                        <th key={`${sdt._id}${index}`} style={{ textAlign: "left", paddingLeft: 5 }}>{sdt.lastName}, {sdt.firstName}</th>
                                        {sdt.grades.map((sdt2) => (
                                            this.props.curriculum.view_subject.title === sdt2.title ?
                                                sdt2.assignments.map((sdt3, index) => (
                                                    <td key={`${sdt3.title}${index}`}>{this.state.month > 6 ? sdt3.gradeN : sdt3.gradeM}</td>
                                                ))
                                                : null

                                        ))}
                                    </tr>
                                )))
                                : null}

                        </tbody>

                    </table>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    student: state.student,
    curriculum: state.curriculum,
    auth: state.auth,
    error: state.error
})

export default connect(
    mapStateToProps,
    { clearErrors, loadUser, getStudents }
)(PrintChartAll);