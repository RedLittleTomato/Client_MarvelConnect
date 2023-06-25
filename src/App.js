import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";

import { Dashboard } from "./layouts";
import { Error, Login, Profile } from "./pages";

function App() {
  const ProtectedRoute = () => {
    const logged = sessionStorage.accessToken;
    if (!logged) return <Navigate to="/" />;
    return <Outlet />;
  };

  useEffect(() => {
    document.title = "Marvel Connect";
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          {/* Require authentication */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Dashboard />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
          {/* Error Handling */}
          <Route path="*" element={<Navigate to="/error" />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
    </>

    // <div className="App">
    //   <Login />
    //   {/* <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header> */}
    // </div>
  );
}

export default App;
