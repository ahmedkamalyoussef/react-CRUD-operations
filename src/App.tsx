import { ChangeEvent, FormEvent, useState } from 'react';
import ProductCard from './Components/Product/ProductCard'
import Modal from './Components/UI/Modal';
import { formInputList, productsList } from './Data/Index'
import Button from './Components/UI/Button';
import Input from './Components/UI/Input';
import { IProduct } from './Interfaces/IProduct';
import { ProductValidation } from './Validations/ProductValidation';
import ErrMsg from './Components/UI/ErrMsg';

function App() {
  const defaultProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    }
  };
  const [isOpen, closeModal] = useState(false)
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [errs, setErrs] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: ''
  });
  function open() {
    closeModal(true)
  }
  function close() {
    closeModal(false)
  }
  const onCancelHandler = () => {
    setProduct(defaultProduct);
    closeModal(false);
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
    if (!notHasErrMsgs)
      setErrs(errors);
  }
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value
    });
      setErrs({
        ...errs,
        [name]:''
      });
  };
  const products = productsList.map(p => <ProductCard key={p.id} product={p} />);
  const inputs = formInputList.map(input => (
    <div className="flex flex-col">
      <label htmlFor={input.id} className='mb-[1px] text-sm font-medium text-gray-700'>{input.lable}</label>
      <Input type={input.type} id={input.id} name={input.name} onChange={onChangeHandler} />
      <ErrMsg key={input.id} message={errs[input.name as keyof typeof errs]} />
    </div>
  ));
  return (
    <main className='container'>
      <Button classes="bg-indigo-700 hover:bg-indigo-800" onClick={open}>Add</Button>
      <div className='m-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md '>
        {products}
      </div>
      <Modal isOpen={isOpen} closeModal={close} title='Add new product'>
        <form className="space-y-3" onSubmit={onSubmetHandler}>
          {inputs}
          <div className="flex items-center justify-between space-x-2 mt-2">
            <Button classes="bg-indigo-700 hover:bg-indigo-800" >Add</Button>
            <Button classes="bg-gray-400 hover:bg-gray-500" onClick={onCancelHandler}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App