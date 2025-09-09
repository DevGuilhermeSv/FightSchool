import {
  Navbar,
  NavbarLink,
  NavbarToggle,
  Dropdown,
  Avatar,
  NavbarBrand,
  NavbarCollapse,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";

function NavbarFs({ setLogged }) {
  const navigate = useNavigate();

  function NewMatchHandler() {
    navigate("/newFight");
  }
  function RankingHandler() {
    navigate("/ranking");
  }
  function FightPageHandler() {
    navigate("/fightPage");
  }
  function MonthFightPageHandler() {
    navigate("/monthFightPage");
  }
  function MyFightsHandler() {
    navigate("/myFights");
  }

  return (
    <Navbar fluid rounded className="bg-black text-white">
      {/* <NavbarBrand href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-yellow-400">
          Fight School
        </span>
      </NavbarBrand> */}

      <div className="flex md:order-2">
        <Dropdown
          inline
          // label={
          //   <Avatar
          //     alt="user"
          //     img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          //     rounded
          //   />
          // }
        >
          <DropdownHeader>
            <span className="block text-sm font-medium">Usuário</span>
          </DropdownHeader>
          <DropdownItem onClick={() => MyFightsHandler()}>
            Minhas Lutas
          </DropdownItem>

          <DropdownItem onClick={() => setLogged(false)}>Sair</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink
          href="#"
          onClick={() => NewMatchHandler()}
          className="text-white hover:text-yellow-300"
        >
          Nova Luta
        </NavbarLink>
        <NavbarLink
          href="#"
          onClick={() => RankingHandler()}
          className="text-white hover:text-yellow-300"
        >
          Ranking dos Atletas
        </NavbarLink>
        <NavbarLink
          href="#"
          onClick={() => MonthFightPageHandler()}
          className="text-white hover:text-yellow-300"
        >
          Lutas do Mês
        </NavbarLink>
        <NavbarLink
          href="#"
          onClick={() => FightPageHandler()}
          className="text-white hover:text-yellow-300"
        >
          Buscar Lutas
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default NavbarFs;
