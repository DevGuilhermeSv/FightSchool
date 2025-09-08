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
  const [score1, setScore1] = useState(fight.fighterOneInformation.fighterScore || 0);
  const [score2, setScore2] = useState(fight.fighterTwoInformation.fighterScore || 0);
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
  function IndividualInformation({ fighterInformation, score1, handleScore1Change, switch1, handleSwitch1Change }) {
    return (<div className="flex flex-col w-1/2 space-y-2">
                  <div className="text-2xl font-bold tracking-wide  text-yellow-300">
                        {fighterInformation.user.userName.toUpperCase()}
                  </div>
                  <div className="text-sm font-bold tracking-wide  text-stone-400 mb-5 ">
                       ( {fighterInformation.user.name.toUpperCase()})
                  </div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Pontos
                  </label>
                  <Input
                    type="number"
                    value={score1}
                    onChange={handleScore1Change}
                    className="w-full"
                  />
                  <ToggleSwitch
                    checked={switch1}
                    label="Vitoria por Finalização"
                    onChange={handleSwitch1Change}
                  />
                </div>)
  }

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Atualizar Status da Luta</ModalHeader>
      <ModalBody>
        <form className="space-y-4">
          <div>
            <>
              
              <div className="flex space-x-4">
                <IndividualInformation fighterInformation={fight.fighterOneInformation} score1={score1} handleScore1Change={handleScore1Change} switch1={switch1} handleSwitch1Change={handleSwitch1Change} />
                <IndividualInformation fighterInformation={fight.fighterTwoInformation} score1={score2} handleScore1Change={handleScore2Change} switch1={switch2} handleSwitch1Change={handleSwitch2Change} />
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
