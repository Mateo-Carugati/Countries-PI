import axios from 'axios';
import {
  GET_ALL_COUNTRIES,
  RESET_COUNTRIES,
  COUNTRY_DETAIL,
  RESET_DETAIL,
  SEARCH_COUNTRIES,
  GET_ALL_ACTIVITIES,
  CREATE_ACTIVITY,
  ORDER_COUNTRIES_ID,
  ORDER_COUNTRIES_POPULATION,
  FILTER_COUNTRIES_CONTINENT,
  FILTER_COUNTRIES_ACTIVITY,
  NEXT_PAGE,
  PREV_PAGE,
  FIRST_PAGE,
  LAST_PAGE,
  RELOAD_PAGINATE
} from "./types";

const endPoint = "http://localhost:3001";

// Action: Obtener todos los países
export const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${endPoint}/countries/`);
      if (data) return dispatch({
        type: GET_ALL_COUNTRIES,
        payload: data
      });
    } catch (error) {
      window.alert(error.message)
    }
  };
};

// Action: Restablecer la lista de países
export const resetCountries = () => {
  return { type: RESET_COUNTRIES };
};

// Action: Obtener los detalles de un país específico
export const countryDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${endPoint}/countries/${id}`);

      return dispatch({
        type: COUNTRY_DETAIL,
        payload: data
      });

    } catch (error) {
      window.alert(error.message);
    };
  };
};

// Action: Restablecer los detalles de un país
export const resetDetail = () => {
  return { type: RESET_DETAIL };
};

// Action: Buscar países por nombre
export const searchCountries = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${endPoint}/countries/name?name=${name}`);

      if (data) return dispatch({
        type: SEARCH_COUNTRIES,
        payload: data
      });
    } catch (error) {
      window.alert(error.message);
    };
  };
};

// Action: Obtener todas las actividades
export const getAllActivities = () => {
  try {
    return async (dispatch) => {
      const { data } = await axios(`${endPoint}/activities/`);

      if (data) return dispatch({
        type: GET_ALL_ACTIVITIES,
        payload: data
      });
    };
  } catch (error) {
    window.alert(error.message);
  };
};

// Action: Crear una nueva actividad
export const createActivity = (activity) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${endPoint}/activities/`, activity);

      if (data) return dispatch({
        type: CREATE_ACTIVITY,
        payload: data
      });
    } catch (error) {
      window.alert(error.message);
    };
  };
};

// Action: Ordenar países por ID
export const orderCountriesId = (order) => {
  return {
    type: ORDER_COUNTRIES_ID,
    payload: order
  };
};

// Action: Ordenar países por población
export const orderCountriesPopulation = (order) => {
  return {
    type: ORDER_COUNTRIES_POPULATION,
    payload: order
  };
};

// Action: Filtrar países por continente
export const filterCountriesContinent = (filter) => {
  return {
    type: FILTER_COUNTRIES_CONTINENT,
    payload: filter
  };
};

// Action: Filtrar países por actividad
export const filterCountriesActivity = (filter) => {
  return {
    type: FILTER_COUNTRIES_ACTIVITY,
    payload: filter
  };
};

// Action: Ir a la primera página de paginación
export const firstPage = () => {
  return { type: FIRST_PAGE };
};

// Action: Ir a la última página de paginación
export const lastPage = () => {
  return { type: LAST_PAGE };
};

// Action: Ir a la página siguiente de paginación
export const nextPage = () => {
  return { type: NEXT_PAGE };
};

// Action: Ir a la página anterior de paginación
export const prevPage = () => {
  return { type: PREV_PAGE };
};

// Action: Recargar la paginación
export const reloadPaginate = () => {
  return { type: RELOAD_PAGINATE };
};
