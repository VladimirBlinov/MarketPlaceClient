import axios from "axios";
import {IMaterial, IProduct} from "../entities/Product";
import {ICategory} from "../entities/Product";

const API_URL = "http://localhost:8080"

export const createProduct = (product: IProduct) => {
  const data = JSON.stringify(product)
  console.log("before post" + data)
  const axiosInstance = axios.create({
      withCredentials: true
    })
  return axiosInstance.post(API_URL + "/private/product/create", data)
}

export const updateProduct = (product: IProduct) => {
  const data = JSON.stringify(product)
  console.log("before post" + data)
  const axiosInstance = axios.create({
      withCredentials: true,
    })
  return axiosInstance.post(API_URL + `/private/product/update/${product.product_id}`, data)
}

export const getProducts = () => {
    const axiosInstance = axios.create({
        withCredentials: true
      })
    return axiosInstance.get<IProduct[]>(API_URL + "/private/product/all", { withCredentials: true })
    .then((response) => {
        return response.data
    })
};

export const getProduct = (product_id: string | undefined) => {
    const axiosInstance = axios.create({
        withCredentials: true
      })

    return axiosInstance.get<IProduct>(API_URL + `/private/product/product/${product_id}`)
    .then((response) => {
        return response.data
    })
};


export const getProductCategories = () => {
    const axiosInstance = axios.create({
        withCredentials: true
      })
    return axiosInstance.get<ICategory[]>(API_URL + "/private/product/category/get_categories", { withCredentials: true })
    .then((response) => {
        const sortCategories = (categories: ICategory[]) => {
            const sortedCategories: any = [];
            const categoriesMap: any = {};
            categories.forEach((category: ICategory) => {
              categoriesMap[category.category_id] = category;
            });
            categories.forEach((category: ICategory) => {
              const parent = categoriesMap[category.parent_category_id];
              if (parent) {
                if (!parent.subcategories) {
                  parent.subcategories = [];
                }
                parent.subcategories.push(category);
              } else {
                sortedCategories.push(category);
              }
            });
            return sortedCategories;
          }

        return sortCategories(response.data)
    })
}

export const getProductMaterials = () => {
  const axiosInstance = axios.create({
      withCredentials: true
    })
  return axiosInstance.get<IMaterial[]>(API_URL + "/private/product/material/get_materials", { withCredentials: true })
  .then((response) => {
      return response.data
  })
}