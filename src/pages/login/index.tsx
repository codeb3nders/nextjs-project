import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { verifyToken } from "@/utils/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = verifyToken(token!);
    if (token && decodedToken) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setErrorMessage("");
      router.push("/dashboard");
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
