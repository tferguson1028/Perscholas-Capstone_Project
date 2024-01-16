import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "./utilities/users-service";

import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";


function App()
{
  const [ user, setUser ] = useState(getUser());

  return (
    <div className="App">
      {
        user ? (
          <>
            <>{/* Might use nav component */}</>
            <Routes>
              <Route index element={<HomePage user={user} setUser={setUser} />} />
              <Route path="/page_not_found" element={<ErrorPage errorCode={404} errorMessage={"Page not found"} />} />
              <Route path="/*" element={<Navigate to="/page_not_found" />} /> {/* Reroute */}
            </Routes>
          </>
        ) : (
          <AuthenticationPage user={user} setUser={setUser} />
        )}
      <footer className="page-footer"></footer>
    </div>
  );
}

export default App;
