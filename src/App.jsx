import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Splash from "./pages/onboarding/Splash";
import { AuthenticationRoutes } from "./routes/AuthenticationRoutes";
import { normalRoutes } from "./routes/normalRoutes";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";
import { ProtectedRoute, PublicRoute } from "./routes/ProtectedRoutes";

function App() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" exact element={<Splash />} />
      <Route element={<PublicRoute token={token} />}>
        {AuthenticationRoutes.map((route, index) => {
          return <Route path={route?.url} element={route?.page} key={index} />;
        })}
      </Route>
      <Route element={<ProtectedRoute token={token} />}>
        {normalRoutes.map((route, index) => {
          return <Route path={route?.url} element={route?.page} key={index} />;
        })}
      </Route>
    </Routes>
  );
}

export default App;
