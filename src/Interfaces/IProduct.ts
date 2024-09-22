export interface IProduct {
    id?: number | undefined;
    title: string;
    description: string;
    imageURL: string;
    price: number;
    colors: string[];
    category: {
        name: string;
        imageURL: string;
    };
}