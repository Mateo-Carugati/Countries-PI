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
  } from "../actions/types";
  
  const initialState = {
    allCountries: [],
    showCountries: [],
    countryDetails: {},
    allActivities: [],
    allContinents: [],
    filterCountries: [],
    filterActivities: [],
    numPage: 1,
    cantPages: 0
  };
  
  const rootReducer = (state = initialState, { type, payload }) => {
  
    switch (type) {
  
      case GET_ALL_COUNTRIES:
        // Lógica para obtener todas las regiones disponibles
        payload.forEach(country => state.allContinents.includes(country.continent) ?
          null : state.allContinents.push(country.continent));
  
        return {
          ...state,
          allCountries: payload,
          showCountries: payload,
          cantPages: Math.ceil(payload.length / 10)
        };
  
      case RESET_COUNTRIES:
        // Restablecer la lista de países mostrados
        return {
          ...state,
          showCountries: state.allCountries
        };
  
      case COUNTRY_DETAIL:
        // Obtener los detalles de un país específico
        return {
          ...state,
          countryDetails: payload
        };
  
      case RESET_DETAIL:
        // Restablecer los detalles de un país
        return {
          ...state,
          countryDetails: {}
        };
  
      case SEARCH_COUNTRIES:
        // Buscar países por nombre
        return {
          ...state,
          showCountries: payload,
          numPage: 1,
          cantPages: Math.ceil(payload.length / 10)
        };
  
      case GET_ALL_ACTIVITIES:
        // Obtener todas las actividades
        return {
          ...state,
          allActivities: payload
        };
  
      case CREATE_ACTIVITY:
        // Crear una nueva actividad
        return {
          ...state,
          allActivities: [...state.allActivities, payload]
        };
  
      case ORDER_COUNTRIES_ID:
        // Ordenar países por ID ascendente o descendente
        return {
          ...state,
          showCountries: payload === "A" ?
            state.showCountries.sort((a, b) => {
              const nameA = a.name.toUpperCase();
              const nameB = b.name.toUpperCase();
  
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            }) :
            state.showCountries.sort((a, b) => {
              const nameA = a.name.toUpperCase();
              const nameB = b.name.toUpperCase();
  
              if (nameA > nameB) return -1;
              if (nameA < nameB) return 1;
              return 0;
            }),
        };
  
      case ORDER_COUNTRIES_POPULATION:
        // Ordenar países por población ascendente o descendente
        return {
          ...state,
          showCountries: payload === "A" ?
            state.showCountries.sort((a, b) => { return a.population - b.population }) :
            state.showCountries.sort((a, b) => { return b.population - a.population })
        };
  
      case FILTER_COUNTRIES_CONTINENT:
        // Filtrar países por continente
        if (state.filterActivities.length > 0) {
          return {
            ...state,
            showCountries: state.filterActivities.filter(country => payload === country.continent)
          }
        }
        return {
          ...state,
          showCountries: state.allCountries.filter(country => payload === country.continent),
          filterCountries: state.allCountries.filter(country => payload === country.continent)
        };
  
      case FILTER_COUNTRIES_ACTIVITY:
        // Filtrar países por actividad
        if (state.filterCountries.length > 0) {
          return {
            ...state,
            showCountries: state.filterCountries.filter(({ activities }) => {
              for (let i = 0; i < activities.length; i++) {
                if (activities[i].name === payload) return true;
              };
              return false;
            }),
          }
        }
  
        return {
          ...state,
          filterActivities: state.allCountries.filter(({ activities }) => {
            for (let i = 0; i < activities.length; i++) {
              if (activities[i].name === payload) return true;
            };
            return false;
          }),
          showCountries: state.allCountries.filter(({ activities }) => {
            for (let i = 0; i < activities.length; i++) {
              if (activities[i].name === payload) return true;
            };
            return false;
          })
        };
  
      case FIRST_PAGE:
        // Ir a la primera página de paginación
        return {
          ...state,
          numPage: 1
        };
  
      case LAST_PAGE:
        // Ir a la última página de paginación
        return {
          ...state,
          numPage: state.cantPages
        };
  
      case NEXT_PAGE:
        // Ir a la página siguiente de paginación
        return {
          ...state,
          numPage: state.numPage + 1
        };
  
      case PREV_PAGE:
        // Ir a la página anterior de paginación
        return {
          ...state,
          numPage: state.numPage - 1
        };
  
      case RELOAD_PAGINATE:
        // Recargar la paginación
        return {
          ...state,
          numPage: 1,
          cantPages: Math.ceil(state.showCountries.length / 10)
        }
  
      default:
        return state;
    };
  };
  
  export default rootReducer;
  