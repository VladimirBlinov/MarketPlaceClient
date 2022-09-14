import { useParams } from "react-router-dom"

const EditProduct = () => {

    const {product_id} = useParams();
    return(
        <div>
            <h2>Товар {product_id}</h2>
        </div>
    )
}

export {EditProduct}