import { combineReducers } from 'redux';

function fileReducer(state = {
    files: [],
    redirectTo: false
}, action) {
    switch (action.type) {
        case 'ADD_FILE_SUCCESS':
            return {
                ...state,
                redirectTo: true
            };
        case 'FILE_LIST_SUCCESS':
            return {
                ...state,
                files: [...action.payload],
                redirectTo: false
            };
        case 'FILE_LIST_ERROR':
            return {
                files: [],
                redirectTo: false
            };
        default:
            return state
    }
}

const rootReducer = combineReducers({
    files: fileReducer
});

export default rootReducer;