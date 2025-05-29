import { useState, type FormEvent } from "react";
import { useAuth } from "./auth-context";
import TheForm from "../../components/UI/form";
import { useNavigate } from "react-router-dom";
import { client, setAuthorizationHeader } from "../../api/client";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [rememberUser, setRememberUser] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { onLogin } = useAuth();

  //desestructurando
  const { email, password } = credentials;
  const disabled = !email || !password;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await client.post("/api/auth/login", {
        email,
        password,
      });
      const token = response.data.token;

      if (rememberUser) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      setAuthorizationHeader(token);
      onLogin();
      navigate("/adverts");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  }

  return (
    <div>
      <h1>Login on Nodepop</h1>
      <form onSubmit={handleSubmit}>
        <TheForm
          label="email"
          type="email"
          value={email}
          onChange={(event) =>
            setCredentials((prev) => ({ ...prev, email: event.target.value }))
          }
          required
        />
        <TheForm
          label="password"
          type="password"
          value={password}
          onChange={(event) =>
            setCredentials((prev) => ({
              ...prev,
              password: event.target.value,
            }))
          }
          required
        />
        <label>
          <input
            type="checkbox"
            checked={rememberUser}
            onChange={(event) => setRememberUser(event.target.checked)}
          />
          Remember me
        </label>
        <br />
        <button type="submit" disabled={disabled}>
          Login
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
