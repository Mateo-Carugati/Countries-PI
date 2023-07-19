import { Link } from "react-router-dom";
import style from "./Card.module.css";

// Componente funcional Card que muestra la información básica de un país.
export default function Card({ id, flag, name, continent }) {
  return (
    // Contenedor del país que se enlaza a la página de detalles del país.
    <div key={id} className={style.contains}>
      {/* Enlace a la página de detalles del país */}
      <Link className={style.Link} to={`/detail/${id}`}>
        {/* Bandera del país */}
        <img src={flag} alt={name} className={style.flag} />

        {/* Nombre del país */}
        <div className={style.country}>
          Pais: <br />
          {/* Si el nombre del país es demasiado largo, se muestra una versión acortada */}
          {name.length > 15 ? `${name.substring(0, 15)}...` : name}
        </div>

        {/* Continente del país */}
        <div className={style.continent}>
          Continente: <br />
          {continent}
        </div>
      </Link>
    </div>
  );
};
