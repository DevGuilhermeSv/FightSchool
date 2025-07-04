import React, { useState } from "react";
import AuthRepository from "../repositories/AuthRepository";
import BaseComponent from "../Components/ui/BaseComponent";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";

const API_BASE = "http://localhost:18157/api";

function LoginPage({ setLogged, className }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await AuthRepository.login(email, password);
      if (data.isAuthSuccessful) {
        setLogged(true);
        localStorage.setItem("token", data.token);
      } else {
        setError(data.errorMessage || "Login falhou.");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor.");
    }
  };

  return (
    <BaseComponent className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        {error && <div className="text-red-400">{error}</div>}
      </form>
    </BaseComponent>
  );
}

export default LoginPage;
