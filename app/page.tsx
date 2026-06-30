import Link from "next/link";
import ProtectedRoutes from "./providers/ProtectedRoutes";

export default function Page() {
  return (
    <ProtectedRoutes>
      <div>
        <Link
          href="/signup"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded duration-300 block mt-4 text-center"
        >
          Go To Signup Page
        </Link>
        <Link
          href="/login"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded duration-300 block mt-4 text-center"
        >
          Go To Login Page
        </Link>
      </div>
    </ProtectedRoutes>
  );
}
