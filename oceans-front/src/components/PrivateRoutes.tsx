import { Navigate } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { useSessionStore } from "../store/sessionStore";
import { axiosInstance } from "../configs/axios";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useSessionStore();
  const { setClearToken } = useSessionStore();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false);
        setIsValidating(false);
        return;
      }

      try {
        const res = await axiosInstance.get("/auth/validate-token", {
          headers: { Authorization: token },
        });
        if (res.status === 200) {
          setIsValid(true);
        } else {
          setClearToken();
        }
      } catch (err) {
        setClearToken();
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token, setClearToken]);

  if (isValidating) {
    return <div className="text-center mt-20">Validando sesión...</div>;
  }

  return isValid ? children : <Navigate to="/auth" replace />;
};
