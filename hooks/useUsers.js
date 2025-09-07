import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "./useAuth";

export const useUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(token)
    const fetchUsers = async () => {
      if (!token) {
        setError("No autenticado");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.usuarios);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return { users, loading, error };
};
