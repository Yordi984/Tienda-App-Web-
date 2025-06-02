import Header from "../../components/ui/HeaderComponent"
import Input from "../../components/ui/InputComponent"
import "./CrearProductos.css"

export default function CrearProductos() {
  return (
    <div>
        <Header text="Hola ¿Qué venderás?"/>
        <Input placeholder="Nombre del producto"/>
        <Input placeholder="Descripción del producto"/>
        <Input placeholder="Opciones del producto (si aplica)" type="string"/>
        <div className="dias-disponibles">
            <p>disponibilidad</p>
            <button>L</button>
            <button>M</button>
            <button>M</button>
            <button>J</button>
            <button>V</button>
         <Input placeholder="Horario disponible"/>
        </div>



    </div>
  )
}
