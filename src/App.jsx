import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Nopage from './pages/nopage/Nopage';
import Order from './pages/order/Order';
import Mystate from "./context/data/myState";
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import Productinfo from './pages/productinfo/Productinfo';
import Model from './components/model/Model'
import AddProduct from './pages/admin/page/Addproduct';
import UpdateProduct from './pages/admin/page/Updateproduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OtpVerification from './components/otpverify/OtpVerification';




const App = () => {
  return (
    
    <Mystate>

   
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/order" element={<Order/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/*" element={<Nopage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/otpverify' element={<OtpVerification/>}/>
        <Route path='/productinfo/:id' element={<Productinfo/>}/>
        <Route path='/model' element={<Model/>}/>
        <Route path="/addproduct" element={<AddProduct/>} />
        <Route path="/updateproduct" element={<UpdateProduct/>} />
       
      </Routes>
      <ToastContainer/>
   
    </Router>
    </Mystate>
    
  )
}

export default App