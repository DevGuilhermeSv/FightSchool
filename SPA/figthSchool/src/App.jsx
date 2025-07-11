import React, { useEffect, useState } from "react";
import LoginPage from "./pages/loginPage";
import FightPage from "./pages/fightPage";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import NewFight from "./Components/newFight";
import NavbarFs from "./Components/NavbarFs"; // Importe o NavbarFs
import WithNavBar from "./Components/layout/WithNavBar";

function AppRoutes({ setLogged, logged }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!logged) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [logged, navigate]);

  return (
    <Routes>
      <Route element={<WithNavBar setLogged={setLogged} logged={logged} />}>
        <Route path="/newFight" element={<NewFight logged={logged} />} />
        <Route
          path="/fightPage"
          element={<FightPage setLogged={setLogged} />}
        />
      </Route>
      <Route path="/login" element={<LoginPage setLogged={setLogged} />} />
    </Routes>
  );
}

export default function App() {
  const [logged, setLogged] = useState(() => {
    // Recupera o estado do localStorage ao iniciar
    return localStorage.getItem("logged") === "true";
  });

  useEffect(() => {
    console.log("Logged state changed:", logged);
    // Atualiza o localStorage sempre que o estado mudar
    localStorage.setItem("logged", logged);
  }, [logged]);

  return (
    <main className="bg-black text-white min-h-screen w-full p-4 flex flex-col items-center gap-6">
      <BrowserRouter>
        <div className="flex flex-row  items-center gap-2">
          <img
            src="/fightschool-logo1.png"
            alt="Fight School Logo"
            className="w-12 h-12 md:w-48 md:h-48"
          />
          <h1 className="text-3xl md:text-6xl font-manufacturing-consent font-normal text-yellow-300 text-center">
            Fight School - Quinta Fire
          </h1>
          <img
            src="/fightschool-logo2.png"
            alt="Fight School Logo"
            className="w-12 h-12 md:w-48 md:h-48"
          />
        </div>
        <AppRoutes setLogged={setLogged} logged={logged} />
      </BrowserRouter>
    </main>
  );
}
