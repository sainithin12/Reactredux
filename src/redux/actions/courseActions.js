import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';
export const loadCoursesSuccess = (courses) => {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
};
export const createCourseSuccess = (course) => {
    return { type: types.CREATE_COURSE_SUCCESS, course };
};
export const updateCourseSuccess = (course) => {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
};
export const deleteCourseOptimistic = (id) => {
    return { type: types.DELETE_COURSE_OPTIMISTIC, id };
};
export function loadCourses() {
    return function(dispatch) {
        dispatch(beginApiCall());
        return courseApi
            .getCourses()
            .then((courses) => {
                dispatch(loadCoursesSuccess(courses));
            })
            .catch((err) => {
                dispatch(apiCallError());

                throw err;
            });
    };
}
export function saveCourse(course) {
    return function(dispatch) {
        dispatch(beginApiCall());
        return courseApi
            .saveCourse(course)
            .then((savedCourse) => {
                course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse));
            })
            .catch((err) => {
                dispatch(apiCallError());

                throw err;
            });
    };
}
export function deleteCourse(courseId) {
    return function(dispatch) {
        // Doing optimistic delete, so not dispatching begin/end api call
        // actions, or apiCallError action since we're not showing the loading status for this
        dispatch(deleteCourseOptimistic(courseId));
        return courseApi.deleteCourse(courseId);
    };
}
