import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Tournaments from "./pages/Tournaments";
import Matches from "./pages/Matches";
import Standings from "./pages/Standings";

import Home from "./pages/Home";
import PublicStandings from "./pages/PublicStandings";
import MatchScoreEntry from "./pages/MatchScoreEntry";

import MatchApprovals from "./pages/MatchApprovals";
import PublicMatches from "./pages/PublicMatches";

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          {/* PUBLIC ROUTES */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />


          <Route
  path="/public-matches/:tournamentId"
  element={<PublicMatches />}
/>
          <Route
            path="/public-standings/:tournamentId"
            element={<PublicStandings />}
          />

          {/* PROTECTED ROUTES */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teams"
            element={
              <ProtectedRoute>
                <Teams />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tournaments"
            element={
              <ProtectedRoute>
                <Tournaments />
              </ProtectedRoute>
            }
          />

          <Route
            path="/matches"
            element={
              <ProtectedRoute>
                <Matches />
              </ProtectedRoute>
            }
          />
          <Route
  path="/score-entry"
  element={
    <ProtectedRoute>
      <MatchScoreEntry />
    </ProtectedRoute>
  }
/>

<Route
  path="/approvals"
  element={
    <ProtectedRoute>
      <MatchApprovals />
    </ProtectedRoute>
  }
/>

          <Route
            path="/standings"
            element={
              <ProtectedRoute>
                <Standings />
              </ProtectedRoute>
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;