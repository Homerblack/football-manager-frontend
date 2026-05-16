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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await login(form);
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
    <div style={pageContainerStyle}>
      {/* VIBRANT AMBIENT LIGHT GLOWS */}
      <div style={glowTopStyle} />
      <div style={glowBottomStyle} />

      {/* LIGHT GLASSMORPHIC CONTAINER CARD */}
      <div style={glassCardStyle}>
        
        {/* HEADER BRAND EMBLEM */}
        <div style={headerSectionStyle}>
          <div style={logoEmblemStyle}>
            <span style={emblemDotStyle} />
            <span style={{ position: "relative", zIndex: 2 }}>⚡</span>
          </div>
          <h1 style={mainTitleStyle}>BIPIN AJIT HOMER</h1>
          <p style={subtitleStyle}>Initialize your secure platform session</p>
        </div>

        {/* INPUT DATA FORM */}
        <form onSubmit={handleSubmit} style={formStyle}>
          
          <div style={inputGroupStyle}>
            <label style={labelStyle}>OPERATOR USERNAME</label>
            <div style={inputWrapperStyle}>
              <span style={inputIconStyle}>👤</span>
              <input
                type="text"
                placeholder="Enter workspace handle"
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
                style={inputStyle}
              />
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>SECURITY PASSWORD</label>
            <div style={inputWrapperStyle}>
              <span style={inputIconStyle}>🔑</span>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                style={inputStyle}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} style={primaryButtonStyle(loading)}>
            {loading ? "Decrypting Credentials..." : "Access Workspace"}
          </button>
        </form>

        {/* FOOTER METADATA */}
        <div style={footerStyle}>
          <span>SECURE NETWORK PROTOCOL V3.4</span>
        </div>
      </div>
    </div>
  );
};

// --- STYLING (MODERN LIGHT GLASS VIBE) ---

const pageContainerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  backgroundColor: "#f4f7fa", // Clean light workspace base
  fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
  boxSizing: "border-box",
  position: "relative",
  overflow: "hidden",
};

// Pastel kinetic accent glows behind the glass panel
const glowTopStyle = {
  position: "absolute",
  width: "450px",
  height: "450px",
  background: "radial-gradient(circle, #e0e7ff 0%, rgba(244,247,250,0) 70%)",
  top: "-150px",
  left: "-100px",
  zIndex: 1,
};

const glowBottomStyle = {
  position: "absolute",
  width: "500px",
  height: "500px",
  background: "radial-gradient(circle, #fdf2f8 0%, rgba(244,247,250,0) 70%)",
  bottom: "-150px",
  right: "-100px",
  zIndex: 1,
};

const glassCardStyle = {
  width: "100%",
  maxWidth: "420px",
  backgroundColor: "rgba(255, 255, 255, 0.75)", // Frosted ice crystal sheet
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "24px",
  padding: "40px",
  border: "1px solid rgba(255, 255, 255, 0.6)", // High-contrast crisp border frame
  boxShadow: "0 20px 40px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
  boxSizing: "border-box",
  zIndex: 10,
};

const headerSectionStyle = {
  textAlign: "center",
  marginBottom: "32px",
};

const logoEmblemStyle = {
  width: "56px",
  height: "56px",
  margin: "0 auto 16px",
  borderRadius: "16px",
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "22px",
  position: "relative",
  boxShadow: "0 4px 10px rgba(15, 23, 42, 0.03)",
};

const emblemDotStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #6366f1, #ec4899)",
  opacity: 0.08,
  filter: "blur(2px)",
};

const mainTitleStyle = {
  fontSize: "24px",
  fontWeight: "900",
  color: "#0f172a",
  margin: "0 0 6px 0",
  letterSpacing: "-0.8px",
};

const subtitleStyle = {
  fontSize: "13px",
  color: "#64748b",
  margin: 0,
  fontWeight: "500",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle = {
  fontSize: "10px",
  fontWeight: "800",
  color: "#94a3b8",
  letterSpacing: "0.8px",
};

const inputWrapperStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  border: "1px solid #cbd5e1",
  borderRadius: "12px",
  padding: "0 14px",
  boxShadow: "inset 0 1px 2px rgba(15, 23, 42, 0.02)",
};

const inputIconStyle = {
  fontSize: "14px",
  color: "#94a3b8",
  marginRight: "10px",
};

const inputStyle = {
  width: "100%",
  padding: "14px 0",
  background: "none",
  border: "none",
  color: "#0f172a",
  fontSize: "15px",
  fontWeight: "500",
  outline: "none",
  boxSizing: "border-box",
};

const primaryButtonStyle = (loading) => ({
  background: loading 
    ? "#cbd5e1" 
    : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
  color: "#ffffff",
  border: "none",
  borderRadius: "12px",
  padding: "16px",
  fontSize: "15px",
  fontWeight: "700",
  cursor: loading ? "not-allowed" : "pointer",
  marginTop: "10px",
  boxShadow: loading ? "none" : "0 10px 20px rgba(37, 99, 235, 0.16)",
  letterSpacing: "0.2px",
});

const footerStyle = {
  textAlign: "center",
  marginTop: "28px",
  fontSize: "9px",
  fontWeight: "700",
  color: "#cbd5e1",
  letterSpacing: "1px",
};

export default Login;