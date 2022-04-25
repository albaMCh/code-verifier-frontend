import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import axios from "../utils/config/axios.config";

export const getAllKatas = (token: string, limit?: number, page?: number) => {
  // http:// localhost:8000/api/kata?id=XXXXXXXXXX
  // Add header with JWT in x-access-token
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    },
    params: {
      limit,
      page,
    },
  };

  return axios.get("/katas", options);
};
export const getKataByID = (token: string, id: string) => {
  // http:// localhost:8000/api/kata?id=XXXXXXXXXX
  // Add header with JWT in x-access-token
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    },
    params: {
      id,
    },
  };
  return axios.get("/katas", options);
};
