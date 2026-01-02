"use client";

import UserDetails from "@/components/owner/users/details/UserDetails";
import { useParams } from "next/navigation";

export default function UserOverviewPage() {
  const { id } = useParams<{ id: string }>();
  return <UserDetails id={id} />;
}
