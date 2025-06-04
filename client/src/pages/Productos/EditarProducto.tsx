import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../../components/ui/HeaderComponent"
import Input from "../../components/ui/InputComponent"
import Boton from "../../components/ui/ButtonComponent"
import NavBar from "../../components/ui/Navbar"
import "./CrearProductos.css"

export default function EditarProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [diasActivos, setDiasActivos] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    opciones: "",
    horario: "",
    precio: "",
    whatsapp: "",
    vendedorId: "",
    categoria: "otros",
  })
  const [imagen, setImagen] = useState<File | null>(null)

  const dias = ["L", "M", "X", "J", "V"]

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        if (payload.tipo === "vendedor") {
          setFormData((prev) => ({
            ...prev,
            vendedorId: payload.id,
          }))
        } else {
          alert("Solo los vendedores pueden editar productos.")
          navigate("/")
        }
      } catch (error) {
        console.error("Error al decodificar token:", error)
      }
    } else {
      alert("No estás autenticado.")
      navigate("/Login")
    }
  }, [navigate])

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:3000/producto/${id}`)
        if (!res.ok) throw new Error("Error al obtener el producto")
        const data = await res.json()

        setFormData((prev) => ({
          ...prev,
          nombre: data.nombre || "",
          descripcion: data.descripcion || "",
          opciones: data.opciones || "",
          horario: data.horario || "",
          precio: data.precio || "",
          whatsapp: data.whatsapp || "",
          categoria: data.categoria || "otros",
        }))

        if (data.disponibilidad) {
          setDiasActivos(data.disponibilidad.split(","))
        }
      } catch (err) {
        console.error(err)
        alert("Error al cargar el producto")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProducto()
  }, [id])

  const toggleDia = (dia: string) => {
    setDiasActivos((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Debes iniciar sesión.")
      return
    }

    try {
      const datos = new FormData()
      datos.append("nombre", formData.nombre)
      datos.append("descripcion", formData.descripcion)
      datos.append("opciones", formData.opciones)
      datos.append("horario", formData.horario)
      datos.append("precio", formData.precio)
      datos.append("whatsapp", formData.whatsapp)
      datos.append("vendedorId", formData.vendedorId)
      datos.append("disponibilidad", diasActivos.join(","))
      datos.append("categoria", formData.categoria)

      if (imagen) {
        datos.append("imagen", imagen)
      }

      const res = await fetch(`http://localhost:3000/producto/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: datos,
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "No se pudo actualizar")
      }

      alert("✅ Producto actualizado correctamente.")
      navigate("/mis-productos")
    } catch (error) {
      console.error(error)
      alert("❌ Error al actualizar el producto.")
    }
  }

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0])
    }
  }

  if (loading) return <div className="loader">Cargando...</div>

  return (
    <div className="crear-productos-container">
      <Header text="Editar Producto" />
      <div className="ordenar">
        <div className="form-box">
          <div className="inputs">
            <Input
              placeholder="Nombre del producto"
              name="nombre"
              onChange={handleChange}
              value={formData.nombre}
            />
            <Input
              placeholder="Descripción del producto"
              name="descripcion"
              onChange={handleChange}
              value={formData.descripcion}
            />
            <Input
              placeholder="Opciones del producto (si aplica)"
              name="opciones"
              onChange={handleChange}
              value={formData.opciones}
            />
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="select-custom"
            >
              {["comida", "ropa", "tecnologia", "accesorios", "otros"].map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="dias-disponibles">
            <div className="titulo">
              <p>Disponibilidad</p>
              <div className="dias">
                {dias.map((dia) => (
                  <button
                    key={dia}
                    className={`dia ${diasActivos.includes(dia) ? "activo" : ""}`}
                    onClick={() => toggleDia(dia)}
                    type="button"
                  >
                    {dia}
                  </button>
                ))}
              </div>
            </div>
            <input
              className="horario-input"
              placeholder="Horario (ej. 8:30 am - 4:00 pm)"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
            />
          </div>

          <Boton color="green" text="Guardar Cambios" onClick={handleSubmit} />
        </div>

        <div className="div-2">
          <Input
            placeholder="Precio"
            name="precio"
            onChange={handleChange}
            value={formData.precio}
          />
          <Input
            placeholder="Número de WhatsApp"
            name="whatsapp"
            onChange={handleChange}
            value={formData.whatsapp}
          />
          <label style={{ marginTop: "10px" }}>
            Imagen (opcional):
            <input type="file" accept="image/*" onChange={handleImagenChange} />
          </label>
        </div>
      </div>
      <NavBar />
    </div>
  )
}
