import { useRouter } from "expo-router";
import api from "../api/api";
export  default function useAuth() {
  const router = useRouter();
  const { error, setError } = useState(null);

  const register = async (data) => {
    try {
      const response = await api.post("users/register", data);
      if (response.status === 201) {
        router.push("/login");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return { register, error };
}
