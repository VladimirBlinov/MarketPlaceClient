import axios from "axios";
import IProduct from "../entities/Product";
import IProductCategory from "../entities/Product";

const API_URL = "http://localhost:8080"

export const createProduct = (product: IProduct) => {
    const data = JSON.stringify(product)
    console.log(data)
    const axiosInstance = axios.create({
        withCredentials: true
      })
    return axiosInstance.post(API_URL + "/private/product_create", data)
}

export const getProducts = () => {
    const axiosInstance = axios.create({
        withCredentials: true
      })
    return axiosInstance.get<IProduct[]>(API_URL + "/private/product_list", { withCredentials: true })
    .then((response) => {
        return response.data
    })
};

export const getProduct = (product_id: string | undefined) => {
    const axiosInstance = axios.create({
        withCredentials: true
      })
    
      const data = JSON.stringify(product_id)
    
    return axiosInstance.post<IProduct>(API_URL + "/private/get_product", data, { withCredentials: true })
    .then((response) => {
        return response.data
    })
};

export const getProductCategories = () => {
    const axiosInstance = axios.create({
        withCredentials: true
      })
    return axiosInstance.get<IProductCategory[]>(API_URL + "/private/product_category/get_categories", { withCredentials: true })
    .then((response) => {
        return response.data
    })
}