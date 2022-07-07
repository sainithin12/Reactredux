import { handleResponse, handleError } from './apiUtils';
const baseUrl = 'https://my-json-server.typicode.com/iahmediibrahim/react-courses-json/authors/';

export function getAuthors() {
    return fetch(baseUrl).then(handleResponse).catch(handleError);
}
