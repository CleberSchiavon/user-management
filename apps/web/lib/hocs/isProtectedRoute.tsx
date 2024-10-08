import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { verifyToken } from "@/services/AuthService";
import { useAuthStore } from "@/store/AuthStore";

const isProtectedRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const {updateUser} = useAuthStore()((state) => state)

    useEffect(() => {
      const checkAuth = async () => {
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
          router.replace("/");
        } else {
          await verifyToken({ token: accessToken })
            .then(() => setVerified(true))
            .catch(() => {
              localStorage.removeItem("token");
              router.replace("/");
              updateUser(undefined)
            });
        }
        setLoading(false);
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return (
        <div className="w-full h-screen flex flex-col items-center justify-center content-center gap-4">
          <p className="font-semibold">Autenticando...</p>
          <Loader className="animate-spin" />
        </div>
      );
    }

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default isProtectedRoute;
