import Header from "../../components/ui/HeaderComponent"
import Input from "../../components/ui/InputComponent"

export default function CrearProductos() {
  return (
    <div>
        <Header text="Hola ¿Qué venderás?"/>
        <Input placeholder="Nombre del producto"/>
        <Input placeholder="Descripción del producto"/>
        <Input placeholder="Opciones del producto (si aplica)" type="string"/>


    </div>
  )
}
