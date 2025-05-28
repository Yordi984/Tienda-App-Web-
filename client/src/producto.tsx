
// para meterme a mi rama es
// git switch luis


// cada vez que se haga una pagina poner estas 2 lineas en main.tsx

    //    <Route path="/pro" element={<TortaDetalle/>} />

// import TortaDetalle from "./producto.tsx";

// escribir en el navegador
// http://localhost:5173/pro


// abrir terminal git bash
// para preparar para guardar usar: git add --all
// luego usar: git commit
// poner un mensaje en la pestaña que se abrio
// guardar y cerrar con: contro+s y luego: control+w
// eso guarda mis cambios en mi rama local, no en la de github

// para subirlo a git hub usar: git push



import "./producto.css";

export default function TortaDetalle() {
  return (
    <>
      <div className="product">
        <img
          className="product__image"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6vNNXLkvHBJdFGSNIGKzK7d6rmCUavUNS0w&s"
          alt="Torta"
        />

        <div className="product__content">
          <div className="product__header">
            <h1 className="product__title">Torta</h1>
            <span className="product__icon">🤍</span>
          </div>

          <p className="product__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies, lorem ut
            dictum faucibus, tortor neque cursus arcu, at scelerisque libero justo ut urna.
          </p>

          <div className="product__options">
            <div className="product__option">Jamón</div>
            <div className="product__option product__option--active">Asada</div>
            <div className="product__option">Chorizo</div>
          </div>

          <div className="product__availability">
            <p className="product__availability-title">Horario de disponibilidad</p>
            <div className="product__days">
              <span className="product__day">L</span>
              <span className="product__day">M</span>
              <span className="product__day">Mi</span>
              <span className="product__day">J</span>
              <span className="product__day">V</span>
            </div>
            <div className="product__time">8:30 am - 4:00 pm</div>
          </div>

          <div className="product__footer">
            <span className="product__price">$45</span>
            <button className="product__button">Contactar con el vendedor</button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M18 20a6 6 0 0 0-12 0" />
          <circle cx="12" cy="10" r="4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </footer>
    </>
  );
}
