import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/Components/ui/input";
import {
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/Components/ui/select";
import { Select } from "./ui/select";
import BaseComponent from "./ui/BaseComponent";
import AuthRepository from "../repositories/AuthRepository";

export const Belt = Object.freeze({
  Branca: 0,
  Amarela: 1,
  Cinza: 2,
  Verde: 3,
  Azul: 4,
  Roxa: 5,
  Marrom: 6,
  Preta: 7,
  Coral: 8,
});

function NewProfile({ className }) {
  const handleCreateUser = async () => {
    const createdUser = await AuthRepository.createUser(newUser);
    if (createdUser.isAuthSuccessful) {
      alert("Perfil criado com sucesso!");
    } else {
      alert("Erro ao criar perfil.");
    }

    setNewUser({
      email: "",
      password: "",
      name: "",
      userName: "",
      phoneNumber: "",
      belt: 0,
    });
  };

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    userName: "",
    phoneNumber: "",
    belt: 0,
  });

  return (
    <BaseComponent className={`md:w-2/3 ${className}`}>
      <h2 className="font-bebas-neue text-center text-preto-text text-2xl md:text-4xl">
        Criar novo perfil
      </h2>
      <Input
        placeholder="Nome"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <Input
        placeholder="Apelido"
        value={newUser.userName}
        onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
      />
      <Input
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <Input
        placeholder="Telefone"
        value={newUser.phoneNumber}
        onChange={(e) =>
          setNewUser({ ...newUser, phoneNumber: e.target.value })
        }
      />
      <Input
        placeholder="Password"
        type="password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <Select
        value={newUser.belt}
        onChange={(e) => {
          setNewUser({ ...newUser, belt: parseInt(e, 10) });
        }}
      >
        {Object.entries(Belt).map(([name, value]) => (
          <SelectItem key={value} value={String(value)}>
            Faixa {name}
          </SelectItem>
        ))}
      </Select>
      <Button onClick={handleCreateUser}>Criar Perfil</Button>
    </BaseComponent>
  );
}
export default NewProfile;
