export default interface IProduct {
    product_id: number,
    product_name: string,
    category_id:   number,
    pieces_in_pack: number,
    material_id:   number,
    weight:       number,
    lenght:       number,
    width:        number,
    height:       number,
    description:  string,
    user_id:  number,
}

export default interface IProductCategory {
    category_id:   number,
    category_name: string,
    parent_category_id:   number,
    active:  boolean,
}