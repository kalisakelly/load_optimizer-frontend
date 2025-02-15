import TrackDetails from "./TrackDetails"
import StoreSpace from "./StoreSpace"
import NotificationsFeedback from "./NotificationsFeedback"

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <NotificationsFeedback />
        </div>
        <div className="space-y-8">
          <TrackDetails />
          <StoreSpace />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

