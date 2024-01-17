import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { ShowProducts } from "./components/ShowProducts-reduce"
import "./App.css"
import { ProductsProvider } from './context/ProductProvider'
import { AuthProvider } from "./context/AuthProvider"
import { LoginForm } from "./components/LoginForm/LoginForm"
import { RegisterForm } from './components/RegisterForm/RegisterForm'

export const App = () => {

  return (
    <>
      <AuthProvider>  
        <ProductsProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<LoginForm />} />
              <Route path='/products' element={<ShowProducts />} /> 
              <Route path='/register' element={<RegisterForm/>} /> 
            </Routes>
          </BrowserRouter>
        </ProductsProvider>
      </AuthProvider>
    </>

  )
}
