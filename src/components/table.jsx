"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Scan } from "lucide-react"

// eslint-disable-next-line react/prop-types
const Table = ({ type }) => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // API endpoints configuration remains the same
  const endpoints = {
    vehicle: {
      findAll: "/vehicle",
      findOne: "/vehicle/",
      update: "/vehicle/",
      delete: "/vehicle/",
    },
    stock: {
      findAll: "/stock",
      findOne: "/stock/",
      update: "/stock/",
      delete: "/stock/",
    },
  }

  const apiEndpoints = endpoints[type]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000${apiEndpoints.findAll}`, {
          withCredentials: true,
        })
        setData(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [apiEndpoints])

  // Filter and pagination logic
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder={`Search ${type}s...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left font-medium text-gray-600">No</th>
                <th className="p-3 text-left font-medium text-gray-600">Product name</th>
                <th className="p-3 text-left font-medium text-gray-600">Product barcode</th>
                <th className="p-3 text-left font-medium text-gray-600">From</th>
                <th className="p-3 text-left font-medium text-gray-600">Delivery to</th>
                <th className="p-3 text-left font-medium text-gray-600">Location</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3 border-t">{startIndex + index + 1}</td>
                  <td className="p-3 border-t">{item.productName || "Tomatoes"}</td>
                  <td className="p-3 border-t">
                    <div className="flex items-center gap-2">
                      {item.barcode || "#001"}
                      <Scan className="h-4 w-4 text-gray-400" />
                    </div>
                  </td>
                  <td className="p-3 border-t">{item.from || "Jackson"}</td>
                  <td className="p-3 border-t">{item.deliveryTo || "John"}</td>
                  <td className="p-3 border-t">{item.location || "Kigali,Rwanda"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-full bg-gray-200 text-gray-600 disabled:opacity-50"
            >
              ‹
            </button>
            <span className="text-sm text-gray-600">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-full bg-black text-white disabled:opacity-50"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Table

