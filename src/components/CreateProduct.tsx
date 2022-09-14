
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import IProduct from "../entities/Product"
import IProductCategory from "../entities/Product"
import { createProduct, getProductCategories } from "../services/productService"
import { useAuth } from "../services/useAuth"

const CreateProduct = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {user} = useAuth();

    const [productCategories, setProductCategories] = useState<IProductCategory[]>([])

    useEffect(() => {
        getProductCategories()
            .then(productCategories => setProductCategories(productCategories))
    }, [])

    //const fromPage = location.pathname ? (location.pathname) : ('/')

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

    return(
        <div className="form-product-plug">
        <section className="form-product">
        <h2>Новый товар</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Название:
                <input type="text" placeholder="Название" {...register("product_name", 
                    {required: "Обязательное поле"})
                    } />
            </label>
            <div className="errmsg">
                {errors?.product_name && errors?.product_name?.message?.toString()}
            </div>

            {/* <label>
                Категория:
                <input type="text" placeholder="Категория" {...register("category_id", 
                    {required: "Обязательное поле"})
                    } />
            </label>
            <div className="errmsg">
                {errors?.category_id && errors?.category_id?.message?.toString()}
            </div> */}

            <label>Категория:</label>
            <select {...register("category_id",{required: "Обязательное поле"})}>
                    {productCategories.map(category => (
                    <option value={category.category_id}>{category.category_name}</option>
                ))}
            </select>
            {/* <div className="errmsg">
                {errors?.category_id && errors?.category_id?.message?.toString()}
            </div> */}
            

            {/* <Controller
                   control={control}
                   render={({ field: { onChange, value, name, ref } }) => (
                     <Select
                      inputRef={ref}
                      value={categoryOptions.find((c) => c.value === value)}
                      name={name}
                      options={categoryOptions}
                      onChange={(selectedOption: ICategory) => {
                       onChange(selectedOption.value);
                      }}
                     />
                   )}
                   name={"category_id"}
                /> */}


            <label>
                Материал:
                <input type="text" placeholder="Материал" {...register("material_id", 
                    {required: "Обязательное поле"})
                    } />
            </label>
            <div className="errmsg">
                {errors?.material_id && errors?.material_id?.message?.toString()}
            </div>

            <label>
                Описание:
                <input type="text" placeholder="Описание" {...register("description") } />
            </label>
            <div className="errmsg">
                {errors?.description && errors?.description?.message?.toString()}
            </div>
            
            <input type="submit" value="Создать" />
        </form>
       </section>
       </div>
    )
}

export {CreateProduct}