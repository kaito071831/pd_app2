import axios, { AxiosInstance } from "axios";
import { getCookie } from "typescript-cookie";

export const createAxiosInstance: () => AxiosInstance = () => {
  return axios.create({
    baseURL: `/api/v1/`,
    headers: {
      "Content-Type": "application/json",
      uid: getCookie("uid"),
      client: getCookie("client"),
      "access-token": getCookie("access-token"),
    },
  });
}
