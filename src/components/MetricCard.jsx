/* eslint-disable react/prop-types */
import { TruckIcon, ShoppingCartIcon, UserIcon, StoreIcon } from "lucide-react"

const icons = {
  delivery: TruckIcon,
  order: ShoppingCartIcon,
  user: UserIcon,
  store: StoreIcon,
}

export default function MetricCard({ title, value, change, period, icon }) {
  const Icon = icons[icon]
  const isPositive = change >= 0

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-lg bg-gray-100 p-2">
          <Icon className="h-5 w-5 text-gray-600" />
        </div>
        <span className="text-sm text-gray-600">{title}</span>
      </div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-3xl font-bold">{value}</h3>
        <div className="flex items-center gap-1">
          <span className={`flex items-center text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? "↑" : "↓"} {Math.abs(change)}%
          </span>
          <span className="text-sm text-gray-500">{period}</span>
        </div>
      </div>
    </div>
  )
}

