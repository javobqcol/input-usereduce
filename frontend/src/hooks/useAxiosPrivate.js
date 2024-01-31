import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useRefreshToken } from "./useRefreshToken";
import { useAuth } from "./useAuth";

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log("prevRequest paso", prevRequest);
        console.log("error response",error?.response?.status)
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          console.log("por aqui no entro nunca");
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log("newAccessToken", newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};
