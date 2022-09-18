import './CreateProduct.scss'
import './Forms.scss'
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import {IMaterial, IProduct} from "../entities/Product"
import {ICategory} from "../entities/Product"
import { createProduct, getProductCategories, getProductMaterials } from "../services/productService"
import { useAuth } from "../services/useAuth"

interface IFormCategory  {
    value: number
    name: string
    class: string
}

interface IFormMaterial{
    value: number
    name: string
    class: string
}

function createFormCategories(category: ICategory, spaces: number, form_product_categories: IFormCategory[]) {
    const spacer = "-";
    const formProductCategory: IFormCategory ={name: spacer.repeat(spaces) + category.category_name,
        value: category.category_id, class: "category"};
        if (spaces == 0 || spaces == 1){
            formProductCategory.class = "main-category"
        }
        form_product_categories.push(formProductCategory)
    if(category.subcategories){
        spaces++
        category.subcategories.forEach((category: any) => createFormCategories(category, spaces, form_product_categories))
    }
    return
} 

function createFormMaterials(material: IMaterial, form_product_materials: IFormMaterial[]) {
    const formProductMaterial: IFormCategory ={name: material.material_name,
        value: material.material_id, class: "material"};
        form_product_materials.push(formProductMaterial)
    return
} 

const CreateProduct = () => {
    const navigate = useNavigate()
    const {user} = useAuth();
    const [productCategories, setProductCategories] = useState<ICategory[]>([])
    const [productMaterials, setProductMaterials] = useState<IMaterial[]>([])

    useEffect(() => {
        getProductCategories()
            .then(productCategories => setProductCategories(productCategories))

        getProductMaterials()
            .then(productMaterials => setProductMaterials(productMaterials))
    }, [])

    const {
        register,
        control,
        formState:{
            errors,
        },
        handleSubmit,
    } = useForm<IProduct>();

    const onSubmit = (product: IProduct) =>{
        product.user_id = user.id
        createProduct(product).then(() => navigate('/products', {replace: true}))
    }

    const formProductCategories: IFormCategory[] = [];
    productCategories.forEach((category) => {                    
        createFormCategories(category, 0, formProductCategories)
        }
    )

    const formProductMaterials: IFormMaterial[] = [];
    productMaterials.forEach((material) => {
        createFormMaterials(material, formProductMaterials)
    })

    return(
        <div className="form-product-plug">
        <section className="form-product">
        <h2>Создать новый товар</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className="form-product-label">
                Название:
                <input type="text" placeholder="Название" {...register("product_name", 
                    {required: "Обязательное поле"})
                    } />
            </label >
            <div className="errmsg">
                {errors?.product_name && errors?.product_name?.message?.toString()}
            </div>

            <label className="form-product-label">Категория:</label>
            <select className="category_id" {...register("category_id",{required: "Обязательное поле"})}>
                    {formProductCategories.map((form_category: IFormCategory) => (
                    <option className={form_category.class} key={form_category.value} value={form_category.value}>{form_category.name}</option>
                        ))
                    }
            </select>

            <label className="form-product-label">Материал:</label>
            <select className="material_id" {...register("material_id",{required: "Обязательное поле"})}>
                    {formProductMaterials.map((form_material: IFormMaterial) => (
                    <option className={form_material.class} key={form_material.value} value={form_material.value}>{form_material.name}</option>
                        ))
                    }
            </select>

            <label className="form-product-label">
                Описание:
                <input type="text" placeholder="Описание" {...register("description") } />
            </label>
            <div className="errmsg">
                {errors?.description && errors?.description?.message?.toString()}
            </div>
            
            <input className='submit-create-product' type="submit" value="Создать" />
        </form>
       </section>
       </div>
    )
}

export {CreateProduct}