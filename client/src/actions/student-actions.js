import axios from "axios";
import { returnErrors } from "../actions/error-actions";

import {
    ADD_STUDENT,
    ADD_STUDENT_FAIL,
    ADD_STUDENT_SUCCESS,
    UPDATE_STUDENT_INFO,
    UPDATE_STUDENT_INFO_SUCCESS,
    UPDATE_STUDENT_INFO_FAIL,
    VIEW_STUDENT,
    GRADE_STUDENT,
    GRADE_STUDENT_SUCCESS,
    GRADE_STUDENT_FAIL,
    GET_STUDENTS,
    GET_STUDENTS_SUCCESS,
    GET_STUDENTS_FAIL,
    DELETE_STUDENT,
} from "./types";

export const addStudent = data => (dispatch) => {
    dispatch({ type: ADD_STUDENT });
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.post('http://localhost:3001/api/student/new', data, config)
        .then(res => {
            dispatch({
                type: ADD_STUDENT_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: ADD_STUDENT_FAIL
            });
        });
};

export const getStudents = () => (dispatch) => {
    dispatch({ type: GET_STUDENTS })

    axios.get('http://localhost:3001/api/student/all')
        .then(res => {
            dispatch({
                type: GET_STUDENTS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_STUDENTS_FAIL
            });
        });
}
export const deleteStudent = data => (dispatch) => {

    axios.put(`http://localhost:3001/api/student/delete/${data}`)
        .then(res => {
            dispatch({
                type: DELETE_STUDENT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}

export const viewStudent = (id, subject) => (dispatch) => {
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }
    axios.get(`http://localhost:3001/api/student/view/${id}/${subject}`, config)
        .then(res => {
            dispatch({
                type: VIEW_STUDENT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}
export const viewStudentRC = (id) => (dispatch) => {
    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }
    axios.get(`http://localhost:3001/api/student/view/${id}`, config)
        .then(res => {
            dispatch({
                type: VIEW_STUDENT,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}

export const gradeStudentN = (student, assignment, value, subject) => (dispatch) => {
    dispatch({ type: GRADE_STUDENT })
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    let gradeInfo = {
        student: student, 
        assignment: assignment,
        value: value,
        subject: subject
    }
    axios.put(`http://localhost:3001/api/student/grade-studentN`, gradeInfo, config)
        .then(res => {
            dispatch({
                type: GRADE_STUDENT_SUCCESS,
                payload: res.data
            })
            // console.log(res.data.grades)
        })
        .catch(err => {
            dispatch({ GRADE_STUDENT_FAIL })
        });
}

export const gradeStudentM = (student, assignment, value, subject) => (dispatch) => {
    dispatch({ type: GRADE_STUDENT })
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    let gradeInfo = {
        student: student, 
        assignment: assignment,
        value: value,
        subject: subject
    }
    axios.put(`http://localhost:3001/api/student/grade-studentM`, gradeInfo, config)
        .then(res => {
            dispatch({
                type: GRADE_STUDENT_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({ GRADE_STUDENT_FAIL })
        });
}

export const updateStudentInfo = (id, data) => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    dispatch({ type: UPDATE_STUDENT_INFO })
    axios.put(`http://localhost:3001/api/student/update/${id}`, data, config)
        .then(res => {
            dispatch({
                type: UPDATE_STUDENT_INFO_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: UPDATE_STUDENT_INFO_FAIL
            })
        });
}