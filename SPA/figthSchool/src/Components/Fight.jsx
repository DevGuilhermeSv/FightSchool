import { Belt } from "./NewProfile";
import BaseComponent from "./ui/BaseComponent";
import { Button, Card, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState, useEffect } from "react";
import UpdateFightStatusModal from "./UpdateFightStatusModal";

import WarningButton from "./ui/warningButton";

import { FightStatusMap } from "../utils/FightStatusMap";
function Fight({ fight, className }) {
  return (
    <BaseComponent className={`p-4 ${className}`}>
      <div className="flex flex-col xl:flex-row xl:justify-around items-center  space-y-2">
        <div
          key={fight.id}
          className=" flex flex-row justify-around space-x-4 align-center items-center "
        >
          <FighterDescription fighter={fight.fighterOne} />
          <div className="text-amarelo-100 text-3xl md:text-5xl font-bebas-neue font-black">
            VS
          </div>
          <FighterDescription fighter={fight.fighterTwo} />
        </div>
        <CardInformation fight={fight} />
      </div>
    </BaseComponent>
  );
}

function FighterDescription({ fighter }) {
  return (
    <Card className="text-white space-y-2 md:min-w-50 ">
      <div className="font-bebas-neue text-2xl ">{fighter.userName}</div>
      <div>{Object.keys(Belt)[fighter.belt]}</div>
    </Card>
  );
}

function CardInformation({ fight }) {
  const [openModal, setOpenModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);

  useEffect(() => {
    console.log("warning modal state changed:", openWarningModal);
  }, [openWarningModal]);

  return (
    <>
      <Card className="max-w-sm font-bebas-neue">
        <h5 className="text-2xl font-bold tracking-wide  text-gray-900 dark:text-white ">
          {FightStatusMap[fight.status]}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {fight.date}
        </p>
        <Button onClick={() => setOpenModal(true)}>
          Finalizar
          <svg
            className="-mr-1 ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <WarningButton onClick={() => setOpenWarningModal(true)}>
          Cancelar
        </WarningButton>
      </Card>
      <UpdateFightStatusModal
        show={openModal}
        onClose={() => setOpenModal(false)}
        fight={fight}
      />
      <WarningModal
        show={openWarningModal}
        onClose={() => setOpenWarningModal(false)}
      />
    </>
  );
}
function WarningModal({ show, onClose }) {
  return (
    <Modal show={show} size="md" onClose={onClose} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Tem certeza que deseja cancelar a luta?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="red" onClick={onClose}>
              Sim, tenho certeza
            </Button>
            <Button color="alternative" onClick={onClose}>
              Não, cancelar
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
export default Fight;
