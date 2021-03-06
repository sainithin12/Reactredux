import { handleResponse, handleError } from './apiUtils';
const baseUrl = 'https://my-json-server.typicode.com/iahmediibrahim/react-courses-json/courses/';

export function getCourses() {
    return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveCourse(course) {
    return fetch(baseUrl + (course.id || ''), {
        method: course.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(course),
    })
        .then(handleResponse)
        .catch(handleError);
}

export function deleteCourse(courseId) {
    return fetch(baseUrl + courseId, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
    })
        .then(handleResponse)
        .catch(handleError);
}
