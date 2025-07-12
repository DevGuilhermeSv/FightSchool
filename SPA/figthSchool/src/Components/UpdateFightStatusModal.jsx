import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ToggleSwitch,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "./ui/select";
import { Input } from "./ui/input";
import MatchRepository from "../repositories/MatchRepository";
import { useNavigate } from "react-router-dom";

export default function UpdateFightStatusModal({ show, onClose, fight }) {
  const [status, setStatus] = useState(fight.status);
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [Match, setMatch] = useState(fight);
  const [score1, setScore1] = useState(fight.fighterOneScore || 0);
  const [score2, setScore2] = useState(fight.fighterTwoScore || 0);
  const navigate = useNavigate();

  const updateMatch = async () => {
    try {
      const updatedMatch = {
        ...Match,
        fightStatus: 1,
        fighterOneScore: score1,
        fighterTwoScore: score2,
      };
      await MatchRepository.updateMatch(updatedMatch);
      alert("Luta atualizada com sucesso!");
      setMatch({});
      navigate("/fightPage");
    } catch (error) {
      console.error("Erro ao atualizar luta:", error);
      alert("Erro ao atualizar luta:" + error.message);
    }
  };

  useEffect(() => {
    if (switch1) setSwitch2(false);
    if (switch2) setSwitch1(false);
  }, [switch1, switch2]);

  function handleScore1Change(e) {
    const value = Number(e.target.value);
    setScore1(value);
    setMatch((prev) => ({ ...prev, fighterOneScore: value }));
  }

  function handleScore2Change(e) {
    const value = Number(e.target.value);
    setScore2(value);
    setMatch((prev) => ({ ...prev, fighterTwoScore: value }));
  }

  function handleSwitch1Change(val) {
    setSwitch1(val);
    setMatch((prev) => ({ ...prev, finish1: val }));
  }

  function handleSwitch2Change(val) {
    setSwitch2(val);
    setMatch((prev) => ({ ...prev, finish2: val }));
  }

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Atualizar Status da Luta</ModalHeader>
      <ModalBody>
        <form className="space-y-4">
          <div>
            <>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Placar
              </label>
              <div className="flex space-x-4">
                <div className="flex flex-col w-1/2 space-y-2">
                  <Input
                    type="number"
                    value={score1}
                    onChange={handleScore1Change}
                    placeholder={`Pontos Lutador 1 (${fight.fighterOne.userName})`}
                    className="w-full p-2 "
                  />
                  <ToggleSwitch
                    checked={switch1}
                    label="Finalização"
                    onChange={handleSwitch1Change}
                  />
                </div>
                <div className="flex flex-col w-1/2 space-y-2">
                  <Input
                    type="number"
                    value={score2}
                    onChange={handleScore2Change}
                    placeholder={`Pontos Lutador 2 (${fight.fighterTwo.userName})`}
                    className="w-full p-2 "
                  />
                  <ToggleSwitch
                    checked={switch2}
                    label="Finalização"
                    onChange={handleSwitch2Change}
                  />
                </div>
              </div>
            </>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={updateMatch}>Salvar</Button>
        <Button color="gray" onClick={onClose}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}
