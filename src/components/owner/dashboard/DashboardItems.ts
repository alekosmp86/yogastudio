import { Calendar, NotebookText, PlusCircle, Users } from "lucide-react"

export const DashboardItems = [{
  title: "Manage classes",
  description: "Add, edit, or delete classes.",
  href: "/owner/classes",
  icon: PlusCircle,
}, {
  title: "Manage schedule",
  description: "Manage recurring weekly classes.",
  href: "/owner/schedule",
  icon: Calendar,
}, {
  title: "Manage users",
  description: "View and manage your users list.",
  href: "/owner/users",
  icon: Users,
}, {
  title: "View reservations",
  description: "View and manage your users' reservations list.",
  href: "/owner/reservations",
  icon: NotebookText,
}]