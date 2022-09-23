import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import { createFormCategories, createFormMaterials, ICategory, IFormCategory, IFormMaterial, IMaterial, IProduct } from "../entities/Product";
import { createProduct, getProduct, getProductCategories, getProductMaterials } from "../services/productService";
import { useAuth } from "../services/useAuth";

const EditProduct = () => {
    const {product_id} = useParams();
    console.log(product_id)
    const navigate = useNavigate()
    const {user} = useAuth();
    const [productCategories, setProductCategories] = useState<ICategory[]>([])
    const [productMaterials, setProductMaterials] = useState<IMaterial[]>([])
    const [product, setProduct] = useState<IProduct>();

    useEffect(() => {
        getProductCategories()
            .then(productCategories => setProductCategories(productCategories))

        getProductMaterials()
            .then(productMaterials => setProductMaterials(productMaterials))

        getProduct(product_id)
        .then(product => setProduct(product))
    }, [product_id])

    const {
        register,
        control,
        formState:{
            errors,
        },
        handleSubmit,
    } = useForm<IProduct>();

    const onSubmit = (product: IProduct) =>{
        if(product_id)
            product.product_id = +product_id

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

            <label className="form-product-label">
                Количество в упаковке:
                <input defaultValue={0} type="text" placeholder="шт" {...register("pieces_in_pack") } />
            </label>
            <div className="errmsg">
                {errors?.pieces_in_pack && errors?.pieces_in_pack?.message?.toString()}
            </div>

            <label className="form-product-label">Материал:</label>
            <select className="material_id" {...register("material_id",{required: "Обязательное поле"})}>
                    {formProductMaterials.map((form_material: IFormMaterial) => (
                    <option className={form_material.class} key={form_material.value} value={form_material.value}>{form_material.name}</option>
                        ))
                    }
            </select>
            
            <label className="form-product-label">
                Вес:
                <input defaultValue={0} type="text" placeholder="г" {...register("weight") } />
            </label>
            <div className="errmsg">
                {errors?.weight && errors?.weight?.message?.toString()}
            </div>

            <label className="form-product-label">
                Длина:
                <input defaultValue={0} type="text" placeholder="мм" {...register("lenght") } />
            </label>
            <div className="errmsg">
                {errors?.lenght && errors?.lenght?.message?.toString()}
            </div>

            <label className="form-product-label">
                Ширина:
                <input defaultValue={0} type="text" placeholder="мм" {...register("width") } />
            </label>
            <div className="errmsg">
                {errors?.width && errors?.width?.message?.toString()}
            </div>

            <label className="form-product-label">
                Высота:
                <input defaultValue={0} type="text" placeholder="мм" {...register("height") } />
            </label>
            <div className="errmsg">
                {errors?.height && errors?.height?.message?.toString()}
            </div>

            <label className="form-product-label">
                Описание:
                <input type="text" placeholder="Описание" {...register("description") } />
            </label>
            <div className="errmsg">
                {errors?.description && errors?.description?.message?.toString()}
            </div>

            <label className="form-product-label">
                Ozon SKU:
                <input defaultValue={0} type="text" placeholder="Ozon SKU" {...register("ozon_sku") } />
            </label>
            <div className="errmsg">
                {errors?.ozon_sku && errors?.ozon_sku?.message?.toString()}
            </div>

            <label className="form-product-label">
                Wildberries SKU:
                <input defaultValue={0} type="text" placeholder="Wildberries SKU" {...register("wildberries_sku") } />
            </label>
            <div className="errmsg">
                {errors?.wildberries_sku && errors?.wildberries_sku?.message?.toString()}
            </div>
            
            <input className='submit-create-product' type="submit" value="Создать" />
        </form>
       </section>
       </div>
    )
}

export {EditProduct}