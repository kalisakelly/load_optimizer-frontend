// import { BellIcon, InfoIcon } from "lucide-react"
import MetricCard from "../components/MetricCard"
import OrderTable from "../components/OrderTable"
import  { useEffect, useState } from 'react';
import axios from 'axios';

// import ConnectPhone from "./components/ConnectPhone"
// import DateRangePicker from "../components/DateRangePicker"

export default function OverView() {


  const [packagingCount, setPackagingCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [packagingResponse, vehicleResponse, usersResponse] = await Promise.all([
          axios.get('http://localhost:3000/packaging/count/packagings'),
          axios.get('http://localhost:3000/vehicle/count/vehicles'),
          axios.get('http://localhost:3000/users/count/users'),
        ]);

        setPackagingCount(packagingResponse.data.count);
        setVehicleCount(vehicleResponse.data.count);
        setUserCount(usersResponse.data.count);
      } catch (error) {
        console.error('Error fetching counts and users:', error);
      }
    };

    fetchCounts();
  }, []);




  return (
    <div className="min-h-screen bg-gray-50/30 p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <div className="flex items-center gap-4">
          {/* <DateRangePicker /> */}
          {/* <div className="flex gap-2">
            <button className="rounded-full bg-indigo-600 p-2 text-white">
              <InfoIcon className="h-5 w-5" />
            </button>
            <button className="rounded-full bg-gray-200 p-2">
              <BellIcon className="h-5 w-5" />
            </button>
          </div> */}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard title="Total Delivery" value={packagingCount} change={16} period="This week" icon="delivery" />
        <MetricCard title="order value" value={vehicleCount} change={-16} period="This week" icon="order" />
        <MetricCard title="User" value={userCount} change={16} period="This week" icon="user" />
        {/* <MetricCard title="Avg. remaining in the store" value="982" change={16} period="This week" icon="store" /> */}
      </div>

      <div className="mt-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <h2 className="mb-4 text-lg font-semibold">Client & Order Management Summary</h2>
          <OrderTable />
        </div>
        <div className="lg:col-span-1">
          {/* <ConnectPhone /> */}
        </div>
      </div>
    </div>
  )
}

