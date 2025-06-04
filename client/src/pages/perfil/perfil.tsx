import ProfileForm from "../../components/layout/ProfileForm"
import HeaderComponent from "../../components/ui/HeaderComponent"
import NavBar from "../../components/ui/Navbar"


const perfil = () => {
  return (
    <div>
    <HeaderComponent text={"Editar perfil"}/>    
    <div style={{ padding: "20px" }}>
      <ProfileForm />
    </div>
    <NavBar/>
    </div>
  )
}

export default perfil
