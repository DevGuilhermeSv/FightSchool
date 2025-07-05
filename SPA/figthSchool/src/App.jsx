import React, { useEffect, useState } from "react";
import LoginPage from "./pages/loginPage";
import FightPage from "./pages/fightPage";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function AppRoutes({ setLogged, logged }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (logged) {
      navigate("/fightPage");
    } else {
      navigate("/login");
    }
  }, [logged, navigate]);

  return (
    <Routes>
      <Route path="/fightPage" element={<FightPage />} />
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
    // Atualiza o localStorage sempre que o estado mudar
    localStorage.setItem("logged", logged);
  }, [logged]);

  return (
    <main className="bg-black text-white min-h-screen w-full p-4 flex flex-col items-center gap-6">
      <BrowserRouter>
        <div className="flex md:flex-row flex-col items-center gap-2">
          <img
            src="/fightschool-logo1.png"
            alt="Fight School Logo"
            className="w-32 h-32 md:w-48 md:h-48"
          />
          <h1 className="text-6xl font-manufacturingConsent font-normal text-yellow-300 text-center">
            Fight School - Quinta Fire
          </h1>
          <img
            src="/fightschool-logo2.png"
            alt="Fight School Logo"
            className="w-32 h-32 md:w-48 md:h-48"
          />
        </div>
        <AppRoutes setLogged={setLogged} logged={logged} />
      </BrowserRouter>
    </main>
  );
}
