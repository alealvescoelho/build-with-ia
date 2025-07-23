import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Equipamentos from "./pages/Equipamentos";
import AnaliseMercado from "./pages/AnaliseMercado";
import Dashboard from "./pages/Dashboard";
import { UserData } from "./types";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");

    if (storedLoginStatus === "true" && storedUsername) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user: UserData) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn && (
              <Layout>
                <Home />
              </Layout>
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn && (
              <Layout>
                <Dashboard />
              </Layout>
            )
          }
        />
        <Route
          path="/analise"
          element={
            isLoggedIn && (
              <Layout>
                <AnaliseMercado />
              </Layout>
            )
          }
        />
        <Route
          path="/equipamentos"
          element={
            isLoggedIn && (
              <Layout>
                <Equipamentos />
              </Layout>
            )
          }
        />
        <Route
          path="/usuario"
          element={
            isLoggedIn && (
              <Layout>
                <div>Usuario</div>
              </Layout>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
