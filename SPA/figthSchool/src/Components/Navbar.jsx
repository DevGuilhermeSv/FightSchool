import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function NavbarFs({ setNewMatchIsOpen, setLogged }) {
  const navigate = useNavigate();

  return (
    <Navbar fluid rounded className="bg-black text-white">
      <Navbar.Brand href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-yellow-400">
          Fight School
        </span>
      </Navbar.Brand>

      <div className="flex md:order-2">
        <Dropdown
          inline
          label={
            <Avatar
              alt="user"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm font-medium">Usuário</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => setLogged(false)}>Sair</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link
          href="#"
          onClick={() => setNewMatchIsOpen(true)}
          className="text-white hover:text-yellow-300"
        >
          Nova Luta
        </Navbar.Link>

        <Dropdown label="Ranking de Atletas" inline>
          <Dropdown.Item onClick={() => navigate("/ranking/peso-leve")}>
            Peso Leve
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate("/ranking/peso-medio")}>
            Peso Médio
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate("/ranking/peso-pesado")}>
            Peso Pesado
          </Dropdown.Item>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}
