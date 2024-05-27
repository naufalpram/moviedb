import { useContext } from "react"
import { QueryContext } from "../store/query"

export const useQuery = () => useContext(QueryContext);