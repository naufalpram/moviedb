import { useContext } from "react";
import { AuthContext } from "../store/auth";

export const useAuth = () => useContext(AuthContext);