import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "./utilities/users-service";

import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import RoomPage from "./pages/RoomPage/RoomPage.jsx";
import GamePage from "./pages/GamePage/GamePage.jsx";
import Logo from "./components/Logo/Logo.jsx";

// General Styling
import "./styles/inputs.css";

function App()
{
  const [user, setUser] = useState(getUser());
  const [room, setRoom] = useState();

  useEffect(() => {}, [room, user]);

  return (
    <div className="App">
      <Logo />
      {
        user ? (
          <>
            <nav></nav>
            <>{/* Might use nav component */}</>
            <Routes>
              {
                room ?
                  <>
                    <Route path={`/room/*`} element={<RoomPage user={user} room={room} setRoom={setRoom} />} />
                    <Route path={`/game/*`} element={<GamePage user={user} room={room} setRoom={setRoom} />} />
                    <Route path="/*" element={<Navigate to={`/room/${room}`} />} />
                  </>
                  :
                  <Route index element={<HomePage user={user} setUser={setUser} setRoom={setRoom} />} />
              }
              <Route path="/room/*" element={<Navigate to="/" />} />
              <Route path="/game/*" element={<Navigate to="/" />} />
              <Route path="/page_not_found" element={<ErrorPage errorCode={404} errorMessage={"Page not found"} />} />
              <Route path="/*" element={<Navigate to="/page_not_found" />} /> {/* Reroute */}
            </Routes>
          </>
        ) : (
          <Routes>
            <Route index element={<AuthenticationPage user={user} setUser={setUser} />} />
            <Route path="/*" element={<Navigate to="/" />} /> {/* Reroute */}
          </Routes>
        )}
      <footer className="page-footer"></footer>
    </div>
  );
}

export default App;
