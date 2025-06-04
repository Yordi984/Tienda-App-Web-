import ProfileForm from "../../components/ui/PerfilY";
import HeaderComponent from "../../components/ui/HeaderComponent";
import NavBar from "../../components/ui/Navbar";

const perfil = () => {
  return (
    <div>
      <HeaderComponent text={"Editar perfil"} />
      <ProfileForm />
      <NavBar />
    </div>
  );
};

export default perfil;
