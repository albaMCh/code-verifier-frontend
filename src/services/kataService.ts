import { AxiosRequestHeaders } from "axios";
import axios from "../utils/config/axios.config";

export const getAllKatas = (token: string, limit?: number, page?: number) => {
  // http:// localhost:8000/api/kata?id=XXXXXXXXXX
  // Add header with JWT in x-access-token
  const options: AxiosRequestHeaders = {
    headers: {
      "x-access-toekn": token,
    },
    params: {
      id,
    },
  };
  return axios.get("/katas", options);
};
export const getKataByID = (token: string, id: string) => {};
