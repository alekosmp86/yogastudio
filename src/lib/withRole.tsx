import { ComponentType } from "react";
import { Roles } from "@/enums/Roles";
import { useSession } from "@/hooks/useSession";

export function withRole<P extends Record<string, unknown>>(
  Component: ComponentType<P>,
  role: Roles
) {
  const Guard: React.FC<P> = (props) => {
    const { loading } = useSession(role);

    if (loading) {
      return <p className="text-white">Checking session...</p>;
    }

    return <Component {...props} />;
  };

  Guard.displayName = `withRole(${Component.displayName || Component.name})`;

  return Guard;
}
