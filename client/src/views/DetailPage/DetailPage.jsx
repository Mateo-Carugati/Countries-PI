import { useEffect, useState } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { countryDetail, resetDetail } from "../../redux/actions/actions";
import style from "./DetailPage.module.css";
import NavigateBar from "../../components/NavigateBar/NavigateBar";

export default function DetailPage() {
  const navigate = useNavigate(); // Hook de enrutamiento para cambiar de página
  const { id } = useParams(); // Obtiene el ID del país desde la URL
  const dispatch = useDispatch(); // Función para despachar acciones de Redux

  const [selectedActivity, setSelectedActivity] = useState(null); // Estado para guardar la actividad seleccionada

  const volver = () => {
    dispatch(resetDetail()); // Restablece los detalles del país en el estado de Redux
    navigate("/home"); // Navega a la página de inicio
  };

  useEffect(() => {
    dispatch(countryDetail(id)); // Carga los detalles del país utilizando el ID
  }, []);

  const { countryDetails } = useSelector((state) => state); // Obtiene los detalles del país desde el estado de Redux
  const { activities } = countryDetails; // Obtiene las actividades del país

  // Función para manejar el clic en una actividad
  const handleClickActivity = (activity) => {
    setSelectedActivity(activity); // Establece la actividad seleccionada en el estado
  };

  // Función para cerrar el modal de la actividad
  const handleCloseModal = () => {
    setSelectedActivity(null); // Limpia la actividad seleccionada para cerrar el modal
  };

  return (
    <div>
      <NavigateBar /> {/* Componente de barra de navegación superior */}

      <div className={style.container}> {/* Contenedor principal */}
        <img src={countryDetails.flag} alt={countryDetails.name} className={style.flag} /> {/* Imagen de la bandera del país */}

        <div className={style.details}> {/* Detalles del país */}
          <h2 className={style.h2}>{countryDetails.name}</h2>
          <h2 className={style.h2}>Continente: {countryDetails.continent}</h2>
          <h2 className={style.h2}>Capital: {countryDetails.capital}</h2>
          <h2 className={style.h2}>Sub Región: {countryDetails.sub_region}</h2>
          <h2 className={style.h2}>Tamaño del área: {countryDetails.area} km²</h2>
          <h2 className={style.h2}>Población: {countryDetails.population} habitantes</h2>
          <h2 className={style.activity}> Actividades: <br /> {/* Título de actividades */}
            {Array.isArray(activities) && activities.length !== 0 ? ( // Comprueba si hay actividades
              activities.map((activity, index) => (
                <div key={index} onClick={() => handleClickActivity(activity)}>
                  <h3 className={style.h3}>
                    <span>⊛ {activity.name}</span> {/* Icono ⊛ y nombre de la actividad */}
                  </h3>
                  <br /> {/* Salto de línea después de cada actividad */}
                </div>
              ))
            ) : (
              <span>No hay actividades</span> // Mostrar mensaje si no hay actividades
            )}
          </h2>

          <Link to="/home" className={style.button}> {/* Enlace para regresar a la página de inicio */}
            REGRESAR
          </Link>
        </div>
      </div>

      {/* Modal para mostrar detalles de la actividad */}
      {selectedActivity && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h3 className={style.h3}>{selectedActivity.name}</h3> {/* Nombre de la actividad */}
            <h3 className={style.h3}>Dificultad: {selectedActivity.difficulty}/5</h3> {/* Dificultad de la actividad */}
            <h3 className={style.h3}>Duración: {selectedActivity.duration} horas</h3> {/* Duración de la actividad */}
            <h3 className={style.h3}>Estación: {selectedActivity.season}</h3> {/* Estación de la actividad */}
            <button className={style.closeButton} onClick={handleCloseModal}> {/* Botón para cerrar el modal */}
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
