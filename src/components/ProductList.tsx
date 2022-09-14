import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import IProduct from "../entities/Product"
import { getProducts } from "../services/productService"


type Props = {
    products: IProduct[],
}

const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        getProducts()
            .then(products => setProducts(products))
    }, [])

    return(
        <div>
        <h3>Товары</h3>
        {products ? (
            products.map(product => (
                <li key={product.product_id}>{product.product_name}: {product.description}</li>
            ))
        ):
        (<><p>У Вас еще нет товаров</p>
        </>)
        }
        <Link to={`/products/new`}> <button>Создать товар</button></Link>
        <div></div>
        </div>
    )
}

export default ProductList