import NewProfile from "@/components/NewProfile";
import Login from "@/components/Login";
function LoginPage({ setLogged }) {
  return (
    <div className="flex md:flex-row flex-col justify-center items-center gap-4 p-4 w-full">
      <NewProfile className="w-3/4" />
      <div>
        <h2>Já possui um perfil? Faça login abaixo:</h2>
        <Login setLogged={setLogged} />
      </div>
    </div>
  );
}
export default LoginPage;
