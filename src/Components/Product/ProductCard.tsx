import Button from "../UI/Button"
import Image from "./Image"

interface IProps {

}
function ProductCard({ }: IProps) {
    return (
        <div className="border rounded-md p-2 flex flex-col">
            <Image imgeURL="https://cdn.webshopapp.com/shops/36270/files/450377051/512x512x1/wax-london-didcot-shirt-corded-lace-white.jpg" alt="prod" classes="rounded-md" />

            <div className="flex items-center justify-between space-x-2 mt-2">
            <Button classes="bg-indigo-700" onClick={()=>{
                alert("clecked")
            }}>Edit</Button>
            <Button classes="bg-red-700">Delete</Button>
            </div>
        </div>
    )
}

export default ProductCard