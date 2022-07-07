import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        case types.CREATE_COURSE_SUCCESS:
            return [ ...state, { ...action.course } ];
        case types.UPDATE_COURSE_SUCCESS:
            return state.map((c) => (c.id === action.course.id ? action.course : c));
        case types.DELETE_COURSE_OPTIMISTIC:
            return state.filter((c) => c.id !== action.id);
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;
        default:
            return state;
    }
}
