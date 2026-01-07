import DashboardCard from "@/components/owner/dashboard/DashboardCard";
import { Command } from "lucide-react";

export default function MembershipDashboardCard() {
  console.log("MembershipDashboardCard");

  return (
    <DashboardCard
      title="membership"
      description="manageMemberships"
      href="/owner/membership"
      icon={<Command size={40} />}
    />
  );
}
