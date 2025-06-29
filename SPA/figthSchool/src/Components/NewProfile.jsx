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

function NewProfile({ createUser }) {
  const [newUser, setNewUser] = useState({
    name: "",
    nickname: "",
    phoneNumber: "",
    belt: 0,
  });

  return (
    <BaseComponent>
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
        placeholder="Telefone"
        value={newUser.phoneNumber}
        onChange={(e) =>
          setNewUser({ ...newUser, phoneNumber: e.target.value })
        }
      />
      <Select
        onChange={(e) =>
          setNewUser({ ...newUser, belt: parseInt(e.target.value) })
        }
      >
        {/* <SelectTrigger>
            <SelectValue placeholder="Faixa" />
          </SelectTrigger> */}
        {[...Array(8).keys()].map((i) => (
          <SelectItem key={i} value={String(i)}>
            Faixa {i}
          </SelectItem>
        ))}
      </Select>
      <Button onClick={() => createUser(newUser)}>Criar Perfil</Button>
    </BaseComponent>
  );
}
export default NewProfile;
