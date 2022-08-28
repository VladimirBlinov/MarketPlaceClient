import React from "react"
import { Product } from "../entities/Product"

type Props = {
    products: Product[],
}

export const ProductList: React.FC<Props> = ({ products }) => {
    return (
        <ul className="product-list">
            {
                products.map((product, i) => (
                    <li key={i}>{product.product_name}</li>
                ))
            }
        </ul>
    )
}