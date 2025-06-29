import BaseComponent from "../Components/ui/BaseComponent";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";

function LoginPage({ setLogged }) {
  return (
    <BaseComponent>
      <form>
        <div>
          <label>Email:</label>
          <Input type="email" />
        </div>
        <div>
          <label>Password:</label>
          <Input type="password" />
        </div>
        <Button onClick={() => setLogged(true)} type="submit">
          Login
        </Button>
      </form>
    </BaseComponent>
  );
}

export default LoginPage;
