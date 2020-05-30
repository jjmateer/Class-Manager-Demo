import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import { getStudents } from "../actions/student-actions";
import "../Components/student-components/print-chart.css";


class PrintChart extends Component {

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
            {view_student.subject ? 
                <div className="table-responsive" style={{marginTop: 50}}>
                    <table className="print-chart-table">
                        <thead>
                            <tr style={{ width: 400, borderTop: "1px solid black" }}>
                                {view_student.sdata ?
                                    <>
                                        <th>NOVEMBER</th>
                                        <th>MAY</th>
                                        <th>{view_student.subject.toUpperCase()}</th>
                                    </>
                                    : null}

                            </tr>
                            </thead>
                            <tbody>
                            {view_student.sdata ?
                                <>
                                    {view_student.sdata.grades.map((sdt) => (
                                        sdt.title === view_student.subject ?
                                            sdt.assignments.map((sdt2, index) => (
                                                <tr key={`${sdt2.title}${index}`}>
                                                    <td style={{ width: "15%" }}>{sdt2.gradeN}</td>
                                                    <td style={{ width: "15%" }}>{sdt2.gradeM}</td>
                                                    <td>{sdt2.title}</td>
                                                </tr>
                                            ))
                                            : null
                                    ))}
                                </>
                                : null}
                                </tbody>

                    </table>
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
    {clearErrors, loadUser, getStudents}
                )(PrintChart);