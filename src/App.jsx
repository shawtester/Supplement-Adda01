import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
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
import ScrollToTop from './ScrollToTop';
import ProductCart from './components/productCart/ProductCart';

import CategoryPage from './pages/category/CategoryPage';

import '@fortawesome/fontawesome-free/css/all.min.css';
import  Search from './pages/search/Search';







const App = () => {
  return (
    
    <Mystate>

  
    <Router>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/order" element={
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
          } />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/dashboard" element={
            <ProtectedRoutesForAdmin><Dashboard /></ProtectedRoutesForAdmin>
          } />
        <Route path="/*" element={<Nopage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        
        <Route path='/productinfo/:id' element={<Productinfo/>}/>
        <Route path='/model' element={<Model/>}/>
        <Route path="/addproduct" element={
            <ProtectedRoutesForAdmin><AddProduct /></ProtectedRoutesForAdmin>} />
     <Route path="/updateproduct" element={
            <ProtectedRoutesForAdmin><UpdateProduct /></ProtectedRoutesForAdmin>} />




<Route path="/category/:categoryName" element={<CategoryPage />} />
<Route path="/category/:categoryName" element={<ProductCart />} />
<Route path='/search' element={<Search/>}/>

<Route path="/product/:id" element={<Productinfo />} />
       
      </Routes>
      <ToastContainer/>
   
    </Router>
    </Mystate>
    
  )
}

export default App


export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('user')) {//currentUser
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}





export const ProtectedRoutesForAdmin = ({ children }) => {
  // Fetch the user from local storage
  const storedUser = JSON.parse(localStorage.getItem('user'));

  // Ensure `storedUser` exists and has the necessary fields
  if (storedUser && storedUser.user && storedUser.user.email) {
    const userEmail = storedUser.user.email;

    // Check if the logged-in user's email matches the admin's email
    if (userEmail === 'aman05cmj@gmail.com') {
      return children; // Allow access to the admin-protected routes
    }
  }

  // Redirect to the login page if the user is not an admin
  return <Navigate to='/login' />;
};
