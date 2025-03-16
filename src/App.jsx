// import { useState } from 'react'
import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

// import './App.css'

import { Login ,
   Signup ,
    Home ,
    LandingPage, 
    LoadStock,
    VehicleLoading,
    Notifications,
    ReportsPage,
    ItemManagementPage, 
    VehiclesPage,
    Stock,
    OverView,
    Otp,
    ResetPassword,
    ForgotPassword,
    ClientOrder,
    ProductList,
    ProductVerification,
    VehiclePackaging
   } from './pages'
import Layout from './components/layout';


const route = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Routes without Layout */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<Otp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />


      {/* Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/home" element={<OverView />} />
        <Route path="/load-stock" element={<LoadStock />} />
        <Route path="/VehicleLoading" element={<VehicleLoading />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/item-management" element={<ItemManagementPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/client-order" element={<ClientOrder />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product-verification" element={<ProductVerification />} />


        
      </Route>
    </Route>
  )
)

function App() {

  return  <RouterProvider router={route}/>
  
}

export default App
