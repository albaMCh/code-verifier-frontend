import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import axios from "../utils/config/axios.config";

export const getAllKatas = (
  rowsPerPage?: number,
  page?: number,
  limit?: number,
  sortType?: string,
  sortProperty?: string
) => {
  // http:// localhost:8000/api/kata?id=XXXXXXXXXX
  // Add header with JWT in x-access-token
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": sessionStorage.getItem("sessionJWTToken") as string,
    },
    params: {
      rowsPerPage,
      page,
      limit,
      sortType,
      sortProperty,
    },
  };

  return axios.get("/katas", options);
};
export const getKataByID = (id: string) => {
  // http:// localhost:8000/api/kata?id=XXXXXXXXXX
  // Add header with JWT in x-access-token
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": sessionStorage.getItem("sessionJWTToken") as string,
    },
    params: {
      id,
    },
  };
  return axios.get("/katas", options);
};

export const createKata = (
  name: string,
  description: string,
  level: string
) => {
  debugger;
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": sessionStorage.getItem("sessionJWTToken") as string,
    },
  };

  const body = {
    name,
    description,
    level,
  };
  return axios.post("/katas", body, options);
};

export const updateKata = (
  id: string,
  name: string,
  description: string,
  level: string
) => {
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": sessionStorage.getItem("sessionJWTToken") as string,
    },
  };

  const body = {
    name,
    description,
    level,
  };
  return axios.put(`/katas?id=${id}`, body, options);
};

export const deleteKata = (id: string) => {
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": sessionStorage.getItem("sessionJWTToken") as string,
    },
  };

  return axios.delete(`/katas?id=${id}`, options);
};

export const voteKata = (id: string, vote: number) => {
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": sessionStorage.getItem("sessionJWTToken") as string,
    },
    params: {
      id: id,
      vote: vote,
    },
  };
  // Declare Body to post
  const body = {};
  return axios.put("/katas/vote", body, options);
};

export const solveKata = (id: string) => {
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": sessionStorage.getItem("sessionJWTToken") as string,
    },
    params: {
      id: id,
    },
  };
  // Declare Body to post
  const body = {};
  return axios.put("/katas/solve", body, options);
};
