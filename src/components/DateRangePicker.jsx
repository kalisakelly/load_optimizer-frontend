import { CalendarIcon } from "lucide-react"

export default function DateRangePicker() {
  return (
    <button className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm">
      <CalendarIcon className="h-4 w-4" />
      <span>May 17 - Jun 17</span>
      <span className="text-xs">▼</span>
    </button>
  )
}

