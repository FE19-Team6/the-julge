import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/authService";

interface UseLoginReturn {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleLogin: (e: FormEvent) => Promise<void>;
  isLoading: boolean;
}

export const useLogin = (): UseLoginReturn => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //리턴값 없으면 Promise<void>
  //리턴값 있으면 Promise<string>, Promise<number> 등
  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.login(email, password);
      alert("로그인 성공!");
      router.push("/");
    } catch (error) {
      alert("로그인 실패!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, handleLogin, isLoading };
};
