import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "./ui/select";
import BaseComponent from "./ui/BaseComponent";

function NewProfile({ createUser, className }) {
  const [newUser, setNewUser] = useState({
    name: "",
    nickname: "",
    phoneNumber: "",
    belt: 0,
  });
  const Belt = Object.freeze({
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

  return (
    <BaseComponent className={className}>
      <h2 className="text-xl font-semibold">Criar novo perfil</h2>
      <Input
        placeholder="Nome"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <Input
        placeholder="Apelido"
        value={newUser.nickname}
        onChange={(e) => setNewUser({ ...newUser, nickname: e.target.value })}
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
      <Select
        value={newUser.belt}
        onChange={(e) =>
          setNewUser({ ...newUser, belt: parseInt(e.target.value, 10) })
        }
      >
        {Object.entries(Belt).map(([name, value]) => (
          <SelectItem key={value} value={String(value)}>
            Faixa {name}
          </SelectItem>
        ))}
      </Select>
      <Button onClick={() => createUser(newUser)}>Criar Perfil</Button>
    </BaseComponent>
  );
}
export default NewProfile;
