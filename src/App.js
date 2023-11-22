import { useState } from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import Hospitals from "./scenes/hospitals";
import AddHospital from "./scenes/add-hospital";
import EditHospital from "./scenes/edit-hospital";
import ForgotLogin from "./scenes/forgot-password";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (AA_UserName, AA_Password, navigate) => {
    console.log('handleLogin function is called');
    try {
      console.log('handleLogin function is called');
      const response = await fetch('http://localhost:5206/api/Admin_Cr/ALog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          AaUserName: AA_UserName,
          AaPassword: AA_Password,
        }),
      });
  
      if (response.ok) {
        console.log('Login successful');
  
        // Set isLoggedIn to true upon successful login
        setLoggedIn((prevLoggedIn) => !prevLoggedIn);
        console.log('isLoggedIn:', isLoggedIn); // Add this line
        // Redirect to /dashboard
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        // Handle login failure
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoggedIn && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isLoggedIn && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
            <Route
              path="/login"
              element={<Login onLogin={(username, password, navigate) => handleLogin(username, password, navigate)} />}
            />

              <Route
                path="/forgot-password"
                element={<ForgotLogin />}
              />
              {isLoggedIn ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/hospitals" element={<Hospitals />} />
                  <Route path="/add-hospital" element={<AddHospital />} />
                  <Route path="/edit-hospital/:id" element={<EditHospital />} />
                </>
              ) : (
                <Route
                  path="/*"
                  element={<Navigate to="/login" replace />}
                />
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
