import axios from "axios";
import IUser from "../entities/User";

const API_URL = "http://localhost:8080";

export const logon = (email: string, password: string) => {
    let data = JSON.stringify({
        email: email,
        password: password
    })
    return axios.post(API_URL + "/users", 
        data);
};


export const login = (email: string, password: string) => {
    let data = JSON.stringify({
        email: email,
        password: password
    })
    return axios.post(API_URL + "/sessions", data, { withCredentials: true })
};

export const logout = () => {
    return axios.post(API_URL + "/logout", { withCredentials: true })
};

export const getCurrentUser = () => {
    const axiosInstance = axios.create({
        withCredentials: true
      })
    return axiosInstance.get<IUser>(API_URL + "/private/whoami", { withCredentials: true })
    .then((response) => {
        return response.data
    })
};
