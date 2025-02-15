"use client"

import { useState } from "react"
import { Download, FileSpreadsheet, FileText, Filter, Loader2, FileIcon as Pdf, RefreshCw } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange
  const [selectedReportType, setSelectedReportType] = useState("delivery")
  const [isGenerating, setIsGenerating] = useState(false)

  const reportTypes = [
    { id: "delivery", name: "Delivery Reports", icon: FileText },
    { id: "inventory", name: "Inventory Reports", icon: FileSpreadsheet },
    { id: "performance", name: "Performance Reports", icon: RefreshCw },
  ]

  const recentReports = [
    {
      id: 1,
      name: "Delivery Report - January 2024",
      type: "PDF",
      date: "15 Feb 2024",
      size: "2.3 MB",
    },
    {
      id: 2,
      name: "Inventory Status Q4",
      type: "Excel",
      date: "14 Feb 2024",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "Performance Analysis 2024",
      type: "CSV",
      date: "13 Feb 2024",
      size: "956 KB",
    },
  ]

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Reports Generation</h1>
          <p className="text-gray-600 mt-2">Generate and download various reports for your business analysis</p>
        </div>

        {/* Report Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Types */}
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <h2 className="font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Report Type
            </h2>
            <div className="space-y-4">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedReportType(type.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    selectedReportType === type.id ? "border-blue-600 bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                  }`}
                >
                  <type.icon className="h-5 w-5" />
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <h2 className="font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date Range</label>
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => setDateRange(update)}
                  isClearable={true}
                  className="w-full p-2 border rounded-lg"
                  placeholderText="Select date range"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Format</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <h2 className="font-semibold flex items-center gap-2">
              <Download className="h-5 w-5" />
              Generate Report
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Selected report will be generated based on your configurations and will be available for download.
              </p>
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="font-semibold mb-6">Recent Reports</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Report Name</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Generated Date</th>
                  <th className="text-left py-3 px-4">Size</th>
                  <th className="text-left py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.id} className="border-b last:border-0">
                    <td className="py-3 px-4">{report.name}</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-2">
                        {report.type === "PDF" && <Pdf className="h-4 w-4 text-red-500" />}
                        {report.type === "Excel" && <FileSpreadsheet className="h-4 w-4 text-green-500" />}
                        {report.type === "CSV" && <FileText className="h-4 w-4 text-blue-500" />}
                        {report.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">{report.date}</td>
                    <td className="py-3 px-4">{report.size}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage

