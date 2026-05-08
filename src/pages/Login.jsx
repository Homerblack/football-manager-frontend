import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const { loginUser } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await login(form);

      loginUser(data);

      navigate("/dashboard");

    } catch (err) {

      console.error(err);

      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>

      <h1>Futsal Admin Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;