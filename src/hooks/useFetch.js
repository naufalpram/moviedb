import { useCallback, useReducer } from 'react';
import service from '../service';
import { API_KEY } from '../config';

const initialState = {
    data: null,
    status: 'idle',
    error: null,
    loading: false,
}

function stateReducer(state, action) {
    switch (action.type) {
        case "CALL_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
                status: "pending"
            }
        case "CALL_REQUEST_SUCCESS":
            return {
                ...state,
                ...action.payload,
                loading: false,
                error: null,
                status: "resolved"
            }
        case "CALL_REQUEST_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                status: "rejected"
            }
        default:
            throw new Error(`There is no action type: ${action.type}`);
    }
}

// dataMapper must return object with property "data"
export const useFetch = (url, queryParams, dataMapper, forImage = false) => {
    const [state, dispatch] = useReducer(stateReducer, initialState);
    
    const fetchData = useCallback(() => {
        dispatch({type: "CALL_REQUEST"});
        service.get(url, {
            params: {
                ...queryParams,
                language: !forImage ? "en-US" : null,
                api_key: API_KEY
            }
        })
        .then(({ data }) => {
            dispatch({type: "CALL_REQUEST_SUCCESS", payload: dataMapper(data)});
        })
        .catch(error => {
            dispatch({type: "CALL_REQUEST_FAILURE", payload: {error}});
        }) 
    }, [url, queryParams, dataMapper]);

    return {...state, params: queryParams, fetchData};
}