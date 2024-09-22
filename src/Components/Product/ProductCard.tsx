import { IProduct } from "../../Interfaces/IProduct";
import { TextSlicer } from "../../Utils/TextSlicerFunction";
import Button from "../UI/Button";
import Image from "./Image";

interface IProps {
    product: IProduct;
}

function ProductCard({ product }: IProps) {
    const { category, colors, description, imageURL, price, title, id } = product;
    return (
        <div className="max-w-40 text-xs md:text-sm md:w-50 md:max-w-lg lg:w-60 mx-auto border rounded-md p-2 flex flex-col h-full">
            <Image imgeURL={imageURL} alt="prod" classes="rounded-md max-h-60" />
            <h3 className="flex-grow">{title}</h3>
            <p className="flex-grow">{TextSlicer(description)}</p>
            <div className="flex items-center my-4 space-x-2 flex-grow">
                {colors.map((color) => {
                    return (
                        <span
                            className="w-5 h-5 rounded-full cursor-pointer border"
                            style={{ backgroundColor: color }}
                            key={id}
                        ></span>
                    );
                })}
            </div>
            <div className="flex items-center justify-between">
                <span>{price}$</span>
                <div className="flex items-center">
                <Image imgeURL={category.imageURL} alt="prod" classes="rounded-full w-10 h-10 object-fill mx-2" />
                <p>{category.name}</p>

                </div>
            </div>
            <div className="flex items-center justify-between space-x-2 mt-2">
                <Button classes="bg-indigo-700">Edit</Button>
                <Button classes="bg-red-700">Delete</Button>
            </div>
        </div>
    );
}
export default ProductCard;
