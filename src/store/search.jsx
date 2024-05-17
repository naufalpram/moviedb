import { createContext, useState } from "react";

const SearchContext = createContext({
    searchQuery: {
        keyword: null
    },
    handleQueryChange: () => {}
});

const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState({
        keyword: null
    });

    function handleQueryChange(query) {
        setSearchQuery(prevQuery => ({
            ...prevQuery,
            ...query
        }));
    }

    return (
        <SearchContext.Provider value={{
            searchQuery, handleQueryChange
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export { SearchContext, SearchProvider }