import { ICategory } from "../../Interfaces/ICategory";
import { IProduct } from "../../Interfaces/IProduct";
import { TextSlicer } from "../../Utils/TextSlicerFunction";
import ColorCircle from "../Color/ColorCircle";
import Button from "../UI/Button";
import Image from "./Image";

interface IProps {
    product: IProduct,
    OpenEditModal: () => void,
    setProductToEdit: (product: IProduct) => void,
    setSelectedCategory: (category: ICategory) => void,
    setEditTempColors: (colors: string[]) => void,
    index: number,
    setProdToEditIndex: (index: number) => void
}

function ProductCard({ product, OpenEditModal, setProductToEdit, setSelectedCategory, setEditTempColors, setProdToEditIndex, index }: IProps) {
    const { category, colors, description, imageURL, price, title } = product;
    const onEdit = () => {
        OpenEditModal();
        setProductToEdit(product);
        setSelectedCategory(product.category);
        setEditTempColors(product.colors);
        setProdToEditIndex(index);
    }
    return (
        <div className="max-w-40 text-xs md:text-sm md:w-50 md:max-w-lg lg:w-60 mx-auto border rounded-md p-2 flex flex-col h-full">
            <Image imgeURL={imageURL} alt="prod" classes="rounded-md max-h-60" />
            <h3 className="flex-grow">{title}</h3>
            <p className="flex-grow">{TextSlicer(description)}</p>
            <div className="flex items-center my-4 space-x-2 flex-grow">
                {colors.map((color, index) => {
                    return (
                        <ColorCircle color={color} key={index} />
                    );
                })}
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm">{price}$</span>
                <div className="flex items-center">
                    <Image imgeURL={category.imageURL} alt="prod" classes="rounded-full w-7 h-7 object-fill mx-2 md:w-10 md:h-10" />
                    <p className="text-xs md:text-sm">{category.name}</p>
                </div>
            </div>
            <div className="flex items-center justify-between space-x-2 mt-2">
                <Button classes="bg-indigo-700" onClick={onEdit}>Edit</Button>
                <Button classes="bg-red-700">Delete</Button>
            </div>
        </div>
    );
}
export default ProductCard;
