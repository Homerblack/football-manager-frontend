import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Navigation from "./Sidebar"; // This replaces the old Sidebar component!

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Track window resizing to dynamically handle layout changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // run on initial mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ backgroundColor: "#0a0a0c", minHeight: "100vh" }}>
      
      {/* 1. TOP NAVBAR: Only render on desktop to maximize screen space on mobile */}
      {!isMobile && <Navbar />}

      {/* 2. CORE LAYOUT FRAMEWORK */}
      <div
        style={{
          display: "flex",
          // Desktop sits side-by-side (row), Mobile stacks cleanly (column)
          flexDirection: isMobile ? "column" : "row",
          minHeight: !isMobile ? "calc(100vh - 60px)" : "100vh", // Accounts for navbar height on desktop
          // CRITICAL: Leaves a safety gap at the bottom on mobile so content isn't blocked by the dock
          paddingBottom: isMobile ? "80px" : "0px", 
        }}
      >
        {/* 3. DYNAMIC NAVIGATION */}
        {/* On desktop: Shows up as your side-panel. On mobile: Morphing sticky bottom dock. */}
        <Navigation />

        {/* 4. MAIN PAGE CONTENT CONTROLLER */}
        <div
          style={{
            flex: 1,
            padding: isMobile ? "16px" : "30px", // Snugger padding on mobile so code fields don't clip
            background: "#0a0a0c", // Clean, immersive dark tactical mode to match your new styling
            color: "#ffffff",
          }}
        >
          {children}
        </div>

      </div>

    </div>
  );
};

export default Layout;