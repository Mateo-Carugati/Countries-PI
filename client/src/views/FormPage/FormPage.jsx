import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createActivity } from "../../redux/actions/actions";
import validation from "../../validation";
import style from "./FormPage.module.css";
import { getAllCountries } from "../../redux/actions/actions";
import NavigationBar from "../../components/NavigateBar/NavigateBar";
import { Link } from "react-router-dom";

export default function FormPage() {
  const [selectState, setSelectState] = useState("");
  const dispatch = useDispatch();
  const { allCountries } = useSelector((state) => state);
  const [error, setError] = useState([]);
  const [activity, setActivity] = useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
    countryID: [],
  });
  const [successMessage, setSuccessMessage] = useState("");

  // Función que se ejecuta cuando cambia algún campo del formulario
  const handleChange = (event) => {
    setError(validation({ ...activity, [event.target.name]: event.target.value }));
    setSelectState(event.target.value);
    setActivity({ ...activity, [event.target.name]: event.target.value });
  };

  // Función que se ejecuta cuando se selecciona un país en el formulario
  const handleCountries = (event) => {
    setError(validation({ ...activity, [event.target.name]: event.target.value }));

    setActivity({
      ...activity,
      countryID: [...activity.countryID, event.target.value],
    });
  };

  // Función para eliminar un país seleccionado del formulario
  const closeCountry = (event) => {
    setActivity({
      ...activity,
      countryID: activity.countryID.filter((country) => country !== event.target.value),
    });
  };

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectState("");
    if (Object.values(error).length === 0) {
      // Si no hay errores, se crea la actividad mediante Redux
      dispatch(createActivity(activity));
      // Se reinician los valores del formulario
      setActivity({
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        countryID: "",
      });
      setError({});
      setSuccessMessage("Actividad creada con éxito");
    } else {
      // Si hay errores, se muestra una alerta
      setSuccessMessage("");
      window.alert("Por favor completa el formulario para enviar una actividad");
    }
  };

  // Cargar todos los países al cargar la página
  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  return (
    <div>
      <NavigationBar /> {/* Componente de barra de navegación superior */}

      <div className={style.contains}> {/* Contenedor principal del formulario */}
        <form onSubmit={handleSubmit}>
          <div className={style.form}>
            <h2>CREA TU ACTIVIDAD</h2> {/* Título del formulario */}
            
            {/* Input para el nombre */}
            <label>NOMBRE</label>
            <input name="name" type="text" onChange={handleChange} />
            {error.name ? <div className={style.error}>{error.name}</div> : null} {/* Mostrar mensaje de error, si existe */}
            
            {/* Input para la duración */}
            <label>DURACION(HORAS)</label>
            <input name="duration" value={activity.duration} type="number" onChange={handleChange} />
            {error.duration ? <div className={style.error}>{error.duration}</div> : null} {/* Mostrar mensaje de error, si existe */}

            {/* Select para la dificultad */}
            <label>DIFICULTAD</label>
            <select name="difficulty" defaultValue={selectState} onChange={handleChange}>
              <option disabled value={selectState}>
                Seleccionar dificultad
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            {error.difficulty ? <div className={style.error}>{error.difficulty}</div> : null} {/* Mostrar mensaje de error, si existe */}

            {/* Select para la estación */}
            <label>ESTACION</label>
            <select name="season" defaultValue={""} onChange={handleChange}>
              <option disabled value="">
                Seleccionar Estación
              </option>
              <option value="Verano">VERANO</option>
              <option value="Otoño">OTOÑO</option>
              <option value="Invierno">INVIERNO</option>
              <option value="Primavera">PRIMAVERA</option>
            </select>
            {error.season ? <div className={style.error}>{error.season}</div> : null} {/* Mostrar mensaje de error, si existe */}

            {/* Select para seleccionar países */}
            <label>PAIS/PAISES</label>
            <select name="countryID" onChange={handleCountries}>
              <option value="">Selecciona el país</option>
              {allCountries.map((country, index) => (
                <option key={index} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            {error.countryID ? <div className={style.error}>{error.countryID}</div> : null} {/* Mostrar mensaje de error, si existe */}

            {/* Mostrar países seleccionados */}
            <div className={style.tag}>
              {activity.countryID &&
                allCountries.map((country) =>
                  activity.countryID.includes(country.id) ? (
                    <div key={country.id}>
                      <button className={style.button} value={country.id} onClick={closeCountry}>
                        X
                      </button>
                      {country.name}
                    </div>
                  ) : null
                )}
            </div>

            {/* Botón para enviar el formulario */}
            {activity.name !== "" && Object.values(error).length === 0 ? (
              <button className={style.buttonSubmit} type="submit">
                ENVIAR
              </button>
            ) : null}
          </div>
        </form>

        {/* Mostrar mensaje de éxito */}
        {successMessage && (
          <div className={style.successMessage}>
            <p>{successMessage}</p>
          </div>
        )}

        {/* Enlace para regresar a la página principal */}
        <Link to="/home" className={style.homeButton}>
          REGRESAR
        </Link>
      </div>
    </div>
  );
}
