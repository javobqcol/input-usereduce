import { useContext } from "react";
import { authContext } from "../context/context";

export const useAuth = () => {
  return useContext(authContext)
}