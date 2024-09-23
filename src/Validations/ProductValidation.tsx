import { IValidProduct } from "../Interfaces/IValidProduct";

export const ProductValidation = (product: IValidProduct) => {
    const errors: IValidProduct = {
        title: "",
        description: "",
        imageURL: "",
        price: ""
    }
    const isImageUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

    if (!product.title.trim() || product.title.length < 10 || product.title.length > 100)
        errors.title = "must be between 10 and 100";
    if (!product.description.trim() || product.description.length < 10 || product.description.length > 999)
        errors.description = "must be between 10 and 999";
    if (!product.imageURL.trim() || !isImageUrl)
        errors.imageURL = "url is not valid";
    if (!product.price.trim() || isNaN(Number(product.price)))
        errors.price = "pls enter a valid price";
    return errors;
}