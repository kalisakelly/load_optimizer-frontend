"use client"

import { useState } from "react"
import { Frown, Meh, SmilePlus, Smile, ThumbsDown } from "lucide-react"

const sampleNotifications = [
  {
    id: 1,
    title: "Director shared an announcement",
    preview: "Attention team members, I hope this message finds you well. I wanted to inform you that we will...",
    time: "now",
    isNew: true,
  },
  {
    id: 2,
    title: "Director shared an announcement",
    preview: "Attention team members, I hope this message finds you well. I wanted to inform you that we will...",
    time: "7 min ago",
    isNew: true,
  },
  {
    id: 3,
    title: "Director shared an announcement",
    preview: "Attention team members, I hope this message finds you well. I wanted to inform you that we will...",
    time: "7 min ago",
    isNew: true,
  },
  {
    id: 4,
    title: "Director shared an announcement",
    preview: "Attention team members, I hope this message finds you well. I wanted to inform you that we will...",
    time: "7 min ago",
    isNew: true,
  },
  {
    id: 5,
    title: "Director shared an announcement",
    preview: "Attention team members, I hope this message finds you well. I wanted to inform you that we will...",
    time: "7 min ago",
    isNew: false,
  },
]

const ratings = [
  { value: "terrible", label: "Terrible", icon: ThumbsDown },
  { value: "bad", label: "Bad", icon: Frown },
  { value: "okay", label: "Okay", icon: Meh },
  { value: "good", label: "Good", icon: Smile },
  { value: "amazing", label: "Amazing", icon: SmilePlus },
]

const NotificationsFeedback = () => {
  const [selectedRating, setSelectedRating] = useState(null)
  const [feedback, setFeedback] = useState("")
  const newNotifications = sampleNotifications.filter((n) => n.isNew)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitted:", { rating: selectedRating, feedback })
    // Handle submission logic here
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Notifications Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">All notifications ({newNotifications.length} new)</h2>
          <button className="text-blue-600 text-sm hover:underline">Mark all as read</button>
        </div>

        <div className="space-y-4">
          {sampleNotifications.map((notification) => (
            <div key={notification.id} className="flex justify-between items-start py-3 border-b last:border-0">
              <div>
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  {notification.preview}
                  <button className="text-blue-600 hover:underline ml-1">More</button>
                </p>
              </div>
              <span className="text-sm text-gray-500 ml-4">{notification.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Give feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-4">
              What do you think is of the issue with working with load optimize
            </label>
            <div className="flex justify-between gap-4">
              {ratings.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedRating(value)}
                  className={`flex flex-col items-center p-4 rounded-lg border flex-1 hover:bg-gray-50 transition-colors ${
                    selectedRating === value ? "border-blue-600 bg-blue-50" : ""
                  }`}
                >
                  <Icon className={`h-6 w-6 ${selectedRating === value ? "text-blue-600" : "text-gray-400"}`} />
                  <span className="text-sm mt-2">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">What are the main reason for rating?</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 border rounded-lg h-32 resize-none"
              placeholder="Type your message here..."
            />
          </div>

          <div className="flex justify-between gap-4">
            <button type="button" className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NotificationsFeedback

