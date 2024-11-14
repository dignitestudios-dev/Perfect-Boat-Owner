import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Splash from "./pages/onboarding/Splash";
import { AuthenticationRoutes } from "./routes/AuthenticationRoutes";
import { normalRoutes } from "./routes/normalRoutes";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";
import Login from "./pages/onboarding/Login";

function App() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" exact element={<Splash />} />
      {token &&
        normalRoutes.map((route, index) => {
          return <Route path={route?.url} element={route?.page} key={index} />;
        })}
      {AuthenticationRoutes.map((route, index) => {
        return <Route path={route?.url} element={route?.page} key={index} />;
      })}
    </Routes>
  );
}

export default App;
