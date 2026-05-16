import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: "📊",
    },
    {
      path: "/teams",
      label: "Teams",
      icon: "🛡️",
    },
    {
      path: "/tournaments",
      label: "Tournaments",
      icon: "🏆",
    },
    {
      path: "/matches",
      label: "Matches",
      icon: "⚽",
    },
    {
      path: "/score-entry",
      label: "Scores",
      icon: "📝",
    },
  ];

  // LOGOUT HANDLER
  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    // REMOVE AUTH DATA
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // REDIRECT TO LOGIN
    navigate("/");
  };

  // ---------------- MOBILE ----------------
  if (isMobile) {
    return (
      <div style={mobileDockContainer}>
        <nav style={mobileNavStyle}>
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...mobileLinkStyle,
                  color: isActive
                    ? "#2563eb"
                    : "#64748b",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    marginBottom: "4px",
                  }}
                >
                  {item.icon}
                </span>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: isActive
                      ? "600"
                      : "400",
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* MOBILE LOGOUT */}
          <button
            onClick={handleLogout}
            style={mobileLogoutStyle}
          >
            <span
              style={{
                fontSize: "20px",
                marginBottom: "4px",
              }}
            >
              🚪
            </span>

            <span
              style={{
                fontSize: "11px",
                fontWeight: "500",
              }}
            >
              Logout
            </span>
          </button>
        </nav>
      </div>
    );
  }

  // ---------------- DESKTOP ----------------
  return (
    <div style={desktopSidebarStyle}>
      {/* BRAND */}
      <div style={brandContainer}>
        <h2 style={brandTitle}>
          Futsal
          <span style={{ color: "#2563eb" }}>
            Admin
          </span>
        </h2>
      </div>

      {/* MENU */}
      <nav style={desktopNavStyle}>
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...desktopLinkStyle,
                backgroundColor: isActive
                  ? "#f1f5f9"
                  : "transparent",
                color: isActive
                  ? "#2563eb"
                  : "#334155",
                fontWeight: isActive
                  ? "600"
                  : "500",
              }}
            >
              <span
                style={{
                  marginRight: "12px",
                  fontSize: "18px",
                }}
              >
                {item.icon}
              </span>

              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT BUTTON */}
      <div style={logoutContainerStyle}>
        <button
          onClick={handleLogout}
          style={logoutButtonStyle}
        >
          <span
            style={{
              marginRight: "12px",
              fontSize: "18px",
            }}
          >
            🚪
          </span>

          Logout
        </button>
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const mobileDockContainer = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: "64px",
  backgroundColor: "#ffffff",
  borderTop: "1px solid #e2e8f0",
  boxShadow:
    "0 -4px 6px -1px rgba(0, 0, 0, 0.05)",
  zIndex: 9999,
  paddingBottom:
    "env(safe-area-inset-bottom)",
};

const mobileNavStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  height: "100%",
};

const mobileLinkStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  width: "16.6%",
  height: "100%",
};

const mobileLogoutStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "16.6%",
  height: "100%",
  border: "none",
  background: "transparent",
  color: "#ef4444",
  cursor: "pointer",
};

const desktopSidebarStyle = {
  width: "240px",
  height: "100vh",
  backgroundColor: "#ffffff",
  borderRight: "1px solid #e2e8f0",
  padding: "24px 16px",
  position: "sticky",
  top: 0,
  display: "flex",
  flexDirection: "column",
  fontFamily:
    "system-ui, -apple-system, sans-serif",
};

const brandContainer = {
  marginBottom: "32px",
  paddingLeft: "12px",
};

const brandTitle = {
  margin: 0,
  fontSize: "22px",
  fontWeight: "700",
  color: "#0f172a",
  letterSpacing: "-0.5px",
};

const desktopNavStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const desktopLinkStyle = {
  display: "flex",
  alignItems: "center",
  padding: "12px 14px",
  textDecoration: "none",
  fontSize: "15px",
  borderRadius: "8px",
  transition: "all 0.2s ease",
};

const logoutContainerStyle = {
  marginTop: "auto",
  paddingTop: "24px",
};

const logoutButtonStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: "12px 14px",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#fff1f2",
  color: "#dc2626",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

export default Sidebar;