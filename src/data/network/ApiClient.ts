import axios from "axios";

import { LocalStore, LocalStoreKeys } from "../local";

const API_URL = "http://localhost:8080/api";
export const ApiClient = axios.create({
  baseURL: API_URL,
  // timeout: 15000, 
});

ApiClient.interceptors.request.use(async config => {
  const accessToken = await LocalStore.getData(LocalStoreKeys.AccessToken);
  if (accessToken !== null) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
    // config.headers = {
    //   "Content-type": "application/json",
    //   Authorization: `Bearer ${accessToken}`,
    // };
  }
  // console.log("Log request:" + JSON.stringify(config, null, 2));
  return config;
});

ApiClient.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    return Promise.reject(error.response.data);
  },
);
