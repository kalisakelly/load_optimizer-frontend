"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const TrackDetails = () => {
  const [expandedSection, setExpandedSection] = useState(null)
  const [formData, setFormData] = useState({
    plateNumber: "",
    model: "",
    weight: "",
  })

  const sections = [
    { id: "plateNumber", label: "Plate number" },
    { id: "model", label: "Model" },
    { id: "weight", label: "Tons, Road Weight" },
  ]

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const handleSave = () => {
    console.log("Saving:", formData)
    // Handle save logic here
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <h2 className="text-lg font-semibold">Add track details</h2>

      <div className="space-y-4">
        {sections.map(({ id, label }) => (
          <div key={id} className="border rounded-lg">
            <button className="w-full p-4 flex justify-between items-center" onClick={() => toggleSection(id)}>
              <span>{label}</span>
              {expandedSection === id ? (
                <Minus className="h-5 w-5 text-gray-400" />
              ) : (
                <Plus className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {expandedSection === id && (
              <div className="p-4 border-t">
                <input
                  type="text"
                  value={formData[id]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [id]: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <span className="text-sm text-gray-600">You can save all the changes you have made.</span>
        <button onClick={handleSave} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Save
        </button>
      </div>
    </div>
  )
}

export default TrackDetails

