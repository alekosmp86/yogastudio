import { Power } from "lucide-react"
import { useRouter } from "next/navigation"
import { removeSession } from "@/lib/utils"

type LogoutButtonProps = {
    className?: string;
}

export default function LogoutButton({className}: LogoutButtonProps) {
  const router = useRouter();

  const signOut = async () => {
    await removeSession();
    router.push("/login");
  };

  return (
      <Power
          className={`${className} text-white h-5 w-5 hover:scale-110 transition cursor-pointer rounded-full`}
          onClick={() => signOut()}
      />
  )
}