import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  login,
} from "../services/authService";

import {
  useAuth,
} from "../context/AuthContext";

const Login = () => {

  const navigate =
    useNavigate();

  const { loginUser } =
    useAuth();

  const [form, setForm] =
    useState({
      username: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const data =
          await login(form);

        loginUser(data);

        navigate("/dashboard");

      } catch (err) {

        console.error(err);

        alert("Login failed");

      } finally {

        setLoading(false);
      }
    };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background:
          "linear-gradient(135deg, #dbeafe 0%, #f5d0fe 50%, #bfdbfe 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* BLUR CIRCLES */}

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "#c084fc",
          borderRadius: "50%",
          filter: "blur(100px)",
          top: "-100px",
          left: "-100px",
          opacity: 0.4,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "#60a5fa",
          borderRadius: "50%",
          filter: "blur(100px)",
          bottom: "-100px",
          right: "-100px",
          opacity: 0.4,
        }}
      />

      {/* LOGIN CARD */}

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background:
            "rgba(255,255,255,0.7)",
          backdropFilter:
            "blur(20px)",
          border:
            "1px solid rgba(255,255,255,0.4)",
          borderRadius: "30px",
          padding: "40px",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.12)",
          position: "relative",
          zIndex: 10,
        }}
      >

        {/* HEADER */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >

          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 20px",
              borderRadius: "24px",
              background:
                "linear-gradient(135deg,#8b5cf6,#3b82f6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "36px",
              boxShadow:
                "0 10px 25px rgba(139,92,246,0.35)",
            }}
          >
            
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              fontWeight: "800",
              color: "#111827",
              letterSpacing: "-1px",
            }}
          >
            BIPIN AJIT HOMER
          </h1>

          <p
            style={{
              marginTop: "12px",
              color: "#6b7280",
              fontSize: "15px",
            }}
          >
            Welcome back 
            <br />
            Sign in to continue
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >

          <div>

            <label
              style={labelStyle}
            >
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

          </div>

          <div>

            <label
              style={labelStyle}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
              style={inputStyle}
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              border: "none",
              padding: "15px",
              borderRadius: "16px",
              background:
                "linear-gradient(135deg,#8b5cf6,#3b82f6)",
              color: "white",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              marginTop: "10px",
              boxShadow:
                "0 10px 20px rgba(59,130,246,0.25)",
              transition: "0.2s",
            }}
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#374151",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "16px",
  border:
    "1px solid rgba(255,255,255,0.5)",
  background:
    "rgba(255,255,255,0.75)",
  backdropFilter: "blur(10px)",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

export default Login;