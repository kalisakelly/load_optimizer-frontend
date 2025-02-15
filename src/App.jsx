// import { useState } from 'react'
import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

// import './App.css'

import { Login , Signup , Home ,LandingPage , LoadStock,VehicleLoading , Notifications , ReportsPage , ItemManagementPage , VehiclesPage  } from './pages'
import Layout from './components/layout';


const route = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Routes without Layout */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      


      {/* Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/load-stock" element={<LoadStock />} />
        <Route path="/VehicleLoading" element={<VehicleLoading />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/item-management" element={<ItemManagementPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />

        
      </Route>
    </Route>
  )
)

function App() {

  return  <RouterProvider router={route}/>
  
}

export default App
