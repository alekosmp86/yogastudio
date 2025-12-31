import { Calendar, NotebookText, PlusCircle, Settings, Users } from "lucide-react"

export const DashboardItems = [{
  title: "manageClasses",
  description: "manageClassesDescription",
  href: "/owner/classes",
  icon: PlusCircle,
}, {
  title: "manageSchedule",
  description: "manageScheduleDescription",
  href: "/owner/schedule",
  icon: Calendar,
}, {
  title: "manageUsers",
  description: "manageUsersDescription",
  href: "/owner/users",
  icon: Users,
}, {
  title: "manageReservations",
  description: "manageReservationsDescription",
  href: "/owner/reservations",
  icon: NotebookText,
}, {
  title: "managePreferences",
  description: "managePreferencesDescription",
  href: "/owner/preferences",
  icon: Settings,
}]