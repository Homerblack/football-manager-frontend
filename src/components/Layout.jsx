import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {

  return (
    <div>

      <Navbar />

      <div style={{ display: "flex" }}>

        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "20px",
            background: "#F3F4F6",
            minHeight: "100vh",
          }}
        >

          {children}

        </div>

      </div>

    </div>
  );
};

export default Layout;