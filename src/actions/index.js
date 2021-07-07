import axios from 'axios';
import uniqid from 'uniqid';

const baseUrl = 'http://localhost:3002';


const fileList = () => async dispatch => {
    return axios.get(`${baseUrl}/files`)
        .then(response => dispatch({type: 'FILE_LIST_SUCCESS', payload: response.data}))
        .catch(errors => dispatch({type: 'FILE_LIST_ERROR', payload: errors}))
};

const addFile = (data) => async dispatch => {
    const promiseArr = data.map((item) => axios.post(`${baseUrl}/files`, {...item, id: uniqid('id-')}))
    Promise.all(promiseArr)
        .then(() => {
            dispatch({type: 'ADD_FILE_SUCCESS'})
            return Promise.resolve();
        })
        .catch(errors => dispatch({type: 'ADD_FILE_ERROR', payload: errors}))
};

export const fileActions = {
    fileList,
    addFile
};
