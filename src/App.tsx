import ProductCard from './Components/Product/ProductCard'
import { productsList } from './Data/Index'

function App() {
  const products=productsList.map(product=><ProductCard key={product.id} product={product}/>);
  return (
    <main className='container'>
      <div className='m-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md '>
      {products}
    </div>
    </main>
  )
}

export default App