import { useCallback, useEffect, useReducer, useState } from 'react';
import service from '../service';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from './useQuery';
const { VITE_API_KEY: API_KEY } = import.meta.env;

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

const defaultConfig = {
    withQueryParams: false,
    onMount: true
};

// dataMapper must return object with property "data"
export const useFetch = (url, paramsArgs = {}, dataMapper, configArgs = {}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const config = {...defaultConfig, ...configArgs}
    const { queryParams } = useQuery();
    const urlParams = new URLSearchParams(location.search);
    const [params, setParams] = useState(
        Object.keys(urlParams).length ? {...urlParams, ...paramsArgs, ...queryParams} : {...paramsArgs, ...queryParams}
    );
    const [state, dispatch] = useReducer(stateReducer, initialState);

    const pushParamsToHistory = useCallback(() => {
        const { page, ...publicParams } = params;
        const filteredParams = Object.entries(publicParams).filter(([, value]) => value !== null);
        navigate({ search: createSearchParams(filteredParams).toString() });
    }, [params, navigate]);
    
    const fetchData = useCallback(() => {
        dispatch({type: "CALL_REQUEST"});
        service.get(url, {
            params: {
                ...params,
                language: "en-US",
                api_key: API_KEY
            }
        })
        .then(({ data }) => {
            dispatch({type: "CALL_REQUEST_SUCCESS", payload: dataMapper(data)});
            if (config.withQueryParams) pushParamsToHistory();
        })
        .catch(error => {
            dispatch({type: "CALL_REQUEST_FAILURE", payload: {error}});
        }) 
    }, [config.withQueryParams, url, params, pushParamsToHistory, dataMapper]);

    useEffect(() => {
        if (config.onMount) fetchData();
    }, [params, fetchData, config.onMount]);
    return {...state, params, setParams, fetchData};
}