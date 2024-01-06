import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { ShowProducts } from "./components/ShowProducts"
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
