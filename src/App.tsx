import { useState } from 'react';
import ProductCard from './Components/Product/ProductCard'
import Modal from './Components/UI/Modal';
import { formInputList, productsList } from './Data/Index'
import Button from './Components/UI/Button';
import Input from './Components/UI/Input';

function App() {
  const [isOpen, closeModal] = useState(false)

  function open() {
    closeModal(true)
  }

  function close() {
    closeModal(false)
  }
  const products = productsList.map(product => <ProductCard key={product.id} product={product} />);
  const inputs = formInputList.map(input => (
    <div className="flex flex-col">
      <label htmlFor={input.id} className='mb-[1px] text-sm font-medium text-gray-700'>{input.lable}</label>
      <Input type={input.type} id={input.id} name={input.name} />
    </div>
  )
  );
  return (
    <main className='container'>
      <Button classes="bg-indigo-700 hover:bg-indigo-800" onClick={open}>Add</Button>

      <div className='m-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md '>
        {products}
      </div>

      <Modal isOpen={isOpen} closeModal={close} title='Add new product'>
        <div className="space-y-3">
          {inputs}
          <div className="flex items-center justify-between space-x-2 mt-2">
            <Button classes="bg-indigo-700 hover:bg-indigo-800">Add</Button>
            <Button classes="bg-gray-400 hover:bg-gray-500">Cancel</Button>
          </div>
        </div>
      </Modal>
    </main>
  )
}

export default App