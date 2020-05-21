import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import { getStudents } from "../actions/student-actions";
import ReactToPrint from "react-to-print";
import "../Components/student-components/print-chart.css";


class PrintChartRC extends Component {

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
        user: PropTypes.object
    }

    render() {
        const { view_student } = this.props.student;
        return (
            <>
                {
                    view_student.sdata ?
                        <div id="RC-table-wrap">
                            {view_student.sdata.grades.map((sdt) => (
                                <table id="RC-print-chart-table" className="print-chart-table">
                                    <thead>
                                        <tr>
                                            {view_student.sdata.grades ?
                                                <>
                                                    <th>NOVEMBER</th>
                                                    <th>MAY</th>
                                                    <th>{sdt.title.toUpperCase()}</th>
                                                </>
                                                : null}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {view_student.sdata.grades ?
                                            <>
                                                {sdt.assignments.map((sdt2, index) => (
                                                    <tr key={`${sdt2.title}${index}`}>
                                                        <td style={{ width: "15%" }}>{sdt2.gradeN}</td>
                                                        <td style={{ width: "15%" }}>{sdt2.gradeM}</td>
                                                        <td>{sdt2.title}</td>
                                                    </tr>
                                                ))}
                                            </>
                                            : null}
                                    </tbody>

                                </table>
                            ))}
                        </div>
                        : null}
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    student: state.student,
    auth: state.auth,
    error: state.error
})

export default connect(
    mapStateToProps,
    { clearErrors, loadUser, getStudents }
)(PrintChartRC);