import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const { user, logoutUser } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {

    logoutUser();

    navigate("/");
  };

  return (
    <div
      style={{
        height: "70px",
        background: "#1F2937",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >

      <h2>Futsal Tournament System</h2>

      <div>

        <span style={{ marginRight: "20px" }}>
          {user?.fullName}
        </span>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;