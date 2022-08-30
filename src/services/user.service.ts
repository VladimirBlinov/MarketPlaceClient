import axios from "axios";

const API_URL = "http://localhost:8080"

export const createProduct = () => {
    return axios.get(API_URL + "/private/product_create", )
}