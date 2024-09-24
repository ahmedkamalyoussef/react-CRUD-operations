import { ICategory } from "./ICategory";

export interface IProduct {
    id?: string | undefined;
    title: string;
    description: string;
    imageURL: string;
    price: string;
    colors: string[];
    category: ICategory
}