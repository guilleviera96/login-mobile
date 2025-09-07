import { useRouter } from "expo-router";
import { api } from "../api/api";
import { useState } from "react";
export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [ error, setError ] = useState(null);
  const register = async (data) => {
    try {
      const response = await api.post("/users/register", data);
      if (response.data.msg) router.replace("/login");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      throw err;
    }
  };
  return { register, error }




  //logica login
  const login = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post("/users/login", data);
      setUser(response.data.user);
      setToken(response.data.token);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Opcional: logout
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return { user, token, loading, error, register, login, logout };
};

  // const register = async (data) => {
  //   try {
  //     const response = await api.post("users/register", data);
  //     if (response.status === 201) {
  //       router.push("/login");
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //     throw err;
  //   }
  // };
  // return { register, error };

