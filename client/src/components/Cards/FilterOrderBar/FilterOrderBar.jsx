import { useDispatch, useSelector } from "react-redux";
import {
  orderCountriesId,
  orderCountriesPopulation,
  filterCountriesContinent,
  filterCountriesActivity,
  resetCountries,
  reloadPaginate,
} from "../../../redux/actions/actions";
import style from "./FilterOrderBar.module.css";
import { useState } from "react";

export default function FilterOrderBar() {
  const dispatch = useDispatch();
  const [filterContinent, setFilterContinent] = useState("filter");
  const { allContinents, allActivities } = useSelector((state) => state);

  // Manejador para los cambios en los selectores
  const handleChange = (event) => {
    if (event.target.name === "id") dispatch(orderCountriesId(event.target.value));
    else if (event.target.name === "population")
      dispatch(orderCountriesPopulation(event.target.value));
    else if (event.target.name === "continent") {
      dispatch(filterCountriesContinent(event.target.value));
      setFilterContinent(event.target.value);
    } else if (event.target.name === "activity")
      dispatch(filterCountriesActivity(event.target.value));

    return dispatch(reloadPaginate());
  };

  // Función para borrar todos los filtros
  const resetFilters = () => {
    dispatch(resetCountries());
    dispatch(orderCountriesId("sort"));
    dispatch(orderCountriesPopulation("sort"));
    setFilterContinent("filter");
    return dispatch(reloadPaginate());
  };

  return (
    <div className={style.contains}>
      {/* Selector de orden alfabético */}
      <div className={style.options}>
        <label>Orden Alfabético:</label>
        <div className={style.selectWrapper}>
          <select name="id" onChange={handleChange} defaultValue="sort">
            <option disabled value="sort">
              Orden:
            </option>
            <option value="A">Ascendente</option>
            <option value="D">Descendente</option>
          </select>
          <div className={style.selectArrow}></div>
        </div>
      </div>

      {/* Selector de orden por población */}
      <div className={style.options}>
        <label>Orden por Población:</label>
        <div className={style.selectWrapper}>
          <select name="population" onChange={handleChange} defaultValue="sort">
            <option disabled value="sort">
              Orden:
            </option>
            <option value="A">Ascendente</option>
            <option value="D">Descendente</option>
          </select>
          <div className={style.selectArrow}></div>
        </div>
      </div>

      {/* Selector para filtrar por continentes */}
      <div className={style.options}>
        <label>Filtrar Continentes:</label>
        <div className={style.selectWrapper}>
          <select name="continent" onChange={handleChange} defaultValue={filterContinent}>
            <option value="filter">Seleccionar continente</option>
            {allContinents.map((continent, index) => (
              <option key={index} value={continent}>
                {continent}
              </option>
            ))}
          </select>
          <div className={style.selectArrow}></div>
        </div>
      </div>

      {/* Selector para filtrar por actividad */}
      <div className={style.options}>
        <label>Filtrar Actividad:</label>
        <div className={style.selectWrapper}>
          <select name="activity" onChange={handleChange} defaultValue={filterContinent}>
            <option value="filter">Seleccionar actividad</option>
            {allActivities.map((activity, index) => (
              <option key={index} value={activity.name}>
                {activity.name}
              </option>
            ))}
          </select>
          <div className={style.selectArrow}></div>
        </div>
      </div>

      {/* Botón para borrar todos los filtros */}
      <button className={style.button} onClick={resetFilters}>
        BORRAR FILTROS
      </button>
    </div>
  );
}
