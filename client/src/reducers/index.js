import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import errorReducer from "./error-reducer";
import studentReducer from "./student-reducer";
import curriculumReducer from "./curriculum-reducer";

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    student: studentReducer,
    curriculum: curriculumReducer
});