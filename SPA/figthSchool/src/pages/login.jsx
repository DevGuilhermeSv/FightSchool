import BaseComponent from "../Components/ui/BaseComponent";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";

function LoginPage({ setLogged, className }) {
  return (
    <BaseComponent className={className}>
      <form>
        <Input placeholder="Email" type="email" />
        <Input placeholder="Senha" type="password" />
        <Button onClick={() => setLogged(true)} type="submit">
          Login
        </Button>
      </form>
    </BaseComponent>
  );
}

export default LoginPage;
