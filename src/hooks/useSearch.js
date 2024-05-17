import { useContext } from "react"
import { SearchContext } from "../store/search"

export const useSearch = () => useContext(SearchContext);