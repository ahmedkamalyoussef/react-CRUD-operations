import ProductCard from './Components/Product/ProductCard'

function App() {
  return (
    <div className='m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md max-w-[120]'>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    </div>
  )
}

export default App