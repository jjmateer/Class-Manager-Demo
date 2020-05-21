import {
    VIEW_CURRICULUM,
    EDIT_CURRICULUM,
    EDIT_CURRICULUM_SUCCESS,
    EDIT_CURRICULUM_FAIL,
    EDIT_ASSIGNMENT_NAME,
    CREATE_CURRICULUM,
    CREATE_CURRICULUM_SUCCESS,
    CREATE_CURRICULUM_FAIL,
    GET_SUBJECTS,
    GET_SUBJECTS_FAIL,
    GET_SUBJECTS_SUCCESS,
    DELETE_SUBJECT,
    DELETE_SUBJECT_FAIL,
    DELETE_SUBJECT_SUCCESS,
    DELETE_ASSIGNMENT,
    DELETE_ASSIGNMENT_SUCCESS,
    DELETE_ASSIGNMENT_FAIL,
} from "../actions/types";

const inititalState = {
    msg: {},
    isLoading: false,
    subjects: [],
    view_subject: {}
};

export default function (state = inititalState, action) {
    switch (action.type) {
        case VIEW_CURRICULUM:
            return {
                ...state,
                isLoading: false,
                view_subject: action.payload,
            }
        case EDIT_CURRICULUM:
        case CREATE_CURRICULUM:
        case GET_SUBJECTS:
        case DELETE_SUBJECT:
        case DELETE_ASSIGNMENT:
            return {
                ...state,
                isLoading: true
            }
        case EDIT_CURRICULUM_FAIL:
        case CREATE_CURRICULUM_FAIL:
        case GET_SUBJECTS_FAIL:
        case DELETE_SUBJECT_FAIL:
        case DELETE_ASSIGNMENT_FAIL:
            return {
                ...state,
                isLoading: false,
                msg: action.payload
            }
        case EDIT_CURRICULUM_SUCCESS:
        case GET_SUBJECTS_SUCCESS:
        case DELETE_ASSIGNMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                subjects: action.payload
            }
        case EDIT_ASSIGNMENT_NAME:
            return {
                ...state,
                isLoading:false
            }
        case DELETE_SUBJECT_SUCCESS:
        case CREATE_CURRICULUM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                msg: action.payload
            }
        default:
            return state;
    }

}