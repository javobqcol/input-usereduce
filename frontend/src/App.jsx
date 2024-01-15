import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { ShowProducts } from "./components/ShowProducts-reduce"
import "./App.css"
import { ProductsProvider } from './context/ProductProvider'
import { AuthProvider } from "./context/AuthProvider"
import { LoginForm } from "./components/LoginForm/LoginForm"

export const App = () => {

  return (
    <>
      <AuthProvider>  
        <ProductsProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LoginForm />} />
              <Route path='/products' element={<ShowProducts />} /> 
            </Routes>
          </BrowserRouter>
        </ProductsProvider>
      </AuthProvider>
    </>

  )
}
