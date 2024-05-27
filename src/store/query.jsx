import { createContext, useCallback, useState } from "react";

const QueryContext = createContext({
    queryParams: {
        query: null
    },
    handleQueryChange: () => {}
});

const QueryProvider = ({ children }) => {
    const [queryParams, setQueryParams] = useState({
        query: null
    });

    const handleQueryChange = useCallback((query) => {
        setQueryParams(prevQuery => ({
            ...prevQuery,
            ...query
        }));
    }, []);

    return (
        <QueryContext.Provider value={{
            queryParams, handleQueryChange
        }}>
            {children}
        </QueryContext.Provider>
    )
}

export { QueryContext, QueryProvider }