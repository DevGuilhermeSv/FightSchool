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
import { Belt } from "./NewProfile";

function NavbarFs({ setLogged }) {
  const navigate = useNavigate();

  function NewMatchHandler() {
    navigate("/newFight");
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

        <Dropdown label="Ranking de Atletas" inline>
          {Object.keys(Belt).map((belt, index) => (
            <DropdownItem
              key={index}
              onClick={() => navigate(`/ranking/${belt}`)}
            >
              {belt}
            </DropdownItem>
          ))}
        </Dropdown>
      </NavbarCollapse>
    </Navbar>
  );
}

export default NavbarFs;
