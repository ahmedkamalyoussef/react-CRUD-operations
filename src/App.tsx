import { ChangeEvent, FormEvent, useState } from 'react';
import ProductCard from './Components/Product/ProductCard'
import Modal from './Components/UI/Modal';
import { Categories, Colors, formInputList, productsList } from './Data/Index'
import Button from './Components/UI/Button';
import Input from './Components/UI/Input';
import { IProduct } from './Interfaces/IProduct';
import { ProductValidation } from './Validations/ProductValidation';
import ErrMsg from './Components/UI/ErrMsg';
import ColorCircle from './Components/Color/ColorCircle';
import { v4 as uuid } from 'uuid';
import { MouseEvent } from "react";
import SelectMenu from './Components/UI/SelectMenu';
import { InputsName } from './Types/InputsName';

function App() {
  const defaultProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      id: "",
      name: "",
      imageURL: "",
    }
  };
  const [selectedCategory, setSelectedCategory] = useState(Categories[0])
  const [isOpen, closeModal] = useState(false)
  const [prodToEditIndex, setProdToEditIndex] = useState<number>(0)
  const [isOpenEdit, closeEditModal] = useState(false)
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [editTempColors, setEditTempColors] = useState<string[]>([]);
  const [tempProductsList, setTempProductsList] = useState<IProduct[]>(productsList);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProduct);
  const [errs, setErrs] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: ''
  });
  function open() {
    closeModal(true)
  }
  function openEdit() {
    closeEditModal(true)
  }
  const onCancelHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProduct(defaultProduct);
    setErrs(
      {
        title: '',
        description: '',
        imageURL: '',
        price: ''
      }
    )
    closeModal(false);
  };
  const onCancelEditHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProduct(defaultProduct);
    setTempColors([]);
    setErrs(
      {
        title: '',
        description: '',
        imageURL: '',
        price: ''
      }
    );
    closeEditModal(false);
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value
    });
    setErrs({
      ...errs,
      [name]: ''
    });
  };
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value
    });
    setErrs({
      ...errs,
      [name]: ''
    });
  };
  const onSubmetHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const errors = ProductValidation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price
    })
    const notHasErrMsgs = Object.values(errors).every(value => value === "");
    if (!notHasErrMsgs) {
      setErrs(errors);
      return;
    }
    setTempProductsList(
      [
        { ...product, id: uuid(), colors: tempColors, category: selectedCategory },
        ...tempProductsList
      ]
    )
    setProduct(defaultProduct);
    setTempColors([]);
    closeModal(false);
  }
  const onSubmetEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const errors = ProductValidation({
      title: productToEdit.title,
      description: productToEdit.description,
      imageURL: productToEdit.imageURL,
      price: productToEdit.price
    })
    const notHasErrMsgs = Object.values(errors).every(value => value === "");
    if (!notHasErrMsgs) {
      setErrs(errors);
      return;
    }
    setProductToEdit({...productToEdit,colors:editTempColors,category:selectedCategory})
    const updatedProducts = [...tempProductsList];
    updatedProducts[prodToEditIndex] = {...productToEdit};
    setTempProductsList(updatedProducts);
    setProductToEdit(defaultProduct);
    setEditTempColors([]);
    closeEditModal(false);
  }
  const products = tempProductsList.map((p, index) => <ProductCard key={p.id} product={p} OpenEditModal={openEdit} index={index}
    setProductToEdit={setProductToEdit} setSelectedCategory={setSelectedCategory} setEditTempColors={setEditTempColors} setProdToEditIndex={setProdToEditIndex} />);
  const colors = Colors.map((color, index) => <ColorCircle key={index} color={color} onClick={() => {
    if (tempColors.includes(color)) {
      setTempColors([...tempColors.filter(c => c != color)])
    } else
      setTempColors([...tempColors, color])
  }} />);
  const editColors = Colors.map((color, index) => <ColorCircle key={index} color={color} onClick={() => {
    if (editTempColors.includes(color)) {
      setEditTempColors([...editTempColors.filter(c => c != color)])
    } else
    setEditTempColors([...editTempColors, color])
  }} />);
  const inputs = formInputList.map(input => (
    <div key={input.id} className="flex flex-col">
      <label key={input.id} htmlFor={input.id} className='mb-[1px] text-sm font-medium text-gray-700'>{input.lable}</label>
      <Input key={input.id} type={input.type} id={input.id} name={input.name} onChange={onChangeHandler} />
      <ErrMsg key={input.id} message={errs[input.name as keyof typeof errs]} />
    </div>
  ));
  const EditInput = (id: string, lable: string, name: InputsName, type: string) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className='mb-[1px] text-sm font-medium text-gray-700'>{lable}</label>
        <Input type={type} id={id} value={productToEdit[name]} name={name} onChange={onChangeEditHandler} />
        <ErrMsg key={id} message={errs[name as keyof typeof errs]} />
      </div>
    );
  }
  return (
    <main className='container'>
      <div className="flex justify-end mx-10">
        <Button classes="bg-indigo-700 hover:bg-indigo-800 w-40 mt-20" onClick={open}>Add</Button>
      </div>
      <div className='m-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md '>
        {products}
      </div>
      {/* add product */}
      <Modal isOpen={isOpen} closeModal={close} title='Add new product'>
        <form className="space-y-3" onSubmit={onSubmetHandler}>
          {inputs}
          <SelectMenu selected={selectedCategory} setSelected={setSelectedCategory} />
          <div className="flex items-center justify-center flex-wrap space-x-1">
            {tempColors.map((color, index) => (
              <span className='p-1 mr-1 mb-1 text-xs rounded-md text-white'
                style={{ backgroundColor: color }}
                key={index}>{color}</span>
            ))}
          </div>
          <div className="items-center my-4 gap-2 flex-grow grid grid-cols-12">
            {colors}
          </div>
          <div className="flex items-center justify-between space-x-2 mt-2">
            <Button classes="bg-indigo-700 hover:bg-indigo-800" >Add</Button>
            <Button classes="bg-gray-400 hover:bg-gray-500" onClick={onCancelHandler}>Cancel</Button>
          </div>
        </form>
      </Modal>
      {/* edit  */}
      <Modal isOpen={isOpenEdit} closeModal={close} title='Edit this product'>
        <form className="space-y-3" onSubmit={onSubmetEditHandler}>
          {EditInput("title", "Product Title", "title", "text")}
          {EditInput("description", "Product Description", "description", "text")}
          {EditInput("image", "Image Url", "imageURL", "text")}
          {EditInput("price", "Product Price", "price", "text")}
          <SelectMenu selected={selectedCategory} setSelected={setSelectedCategory} />
          <div className="flex items-center justify-center flex-wrap space-x-1">
            {editTempColors.map((color, index) => (
              <span className='p-1 mr-1 mb-1 text-xs rounded-md text-white'
                style={{ backgroundColor: color }}
                key={index}>{color}</span>
            ))}
          </div>
          <div className="items-center my-4 gap-2 flex-grow grid grid-cols-12">
            {editColors}
          </div>
          <div className="flex items-center justify-between space-x-2 mt-2">
            <Button classes="bg-indigo-700 hover:bg-indigo-800" >Edit</Button>
            <Button classes="bg-gray-400 hover:bg-gray-500" onClick={onCancelEditHandler}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App