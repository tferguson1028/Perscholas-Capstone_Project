import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "./utilities/users-service";

import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";


function App()
{
  const [user, setUser] = useState(getUser());
  
  return (
    <div className="App">
      {
        user ? (
        <>
          <>{/* Might use nav component */}</>
          <main>
            <Routes>
              <Route index element={<HomePage user={user} setUser={setUser} />} />
              <Route path="/page_not_found" element={<ErrorPage error={404} message={"Page not found"}/>} />              <Route path="/*" element={<Navigate to="/orders/new" />} /> {/* Reroute */}
            </Routes>
          </main>
        </>
      ) : (
        <AuthenticationPage user={user} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
