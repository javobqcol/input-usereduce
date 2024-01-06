import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { ShowProducts } from "./components/ShowProducts-reduce"
import "./App.css"


export const App = () => {

  return (
  
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<ShowProducts />} />
    </Routes>
   </BrowserRouter>
  )
}
