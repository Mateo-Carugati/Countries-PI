export default function validation(inputs) {
    let error = {};
    let regexName = /^[a-zA-Z\s]{4,}$/g;

    if(inputs.duration && inputs.duration <= 0) error.duration = "La duracion no puede ser 0 o menos";
    else if(inputs.duration > 24) error.duration = "Una actividad no puede durar mas de 24 horas";
    
    if(inputs.name && inputs.name === "") error.name = "La actividad turista debe tener un nombre";
    else if(!regexName.test(inputs.name)) error.name = "Este no es un nombre valido para la actividad";

    if(inputs.difficulty && inputs.difficulty === 0) error.difficulty = "Porfavor seleccione una dificultad";
    
    if(inputs.season && inputs.season === "") error.season = "Porfavor seleccione una estación";

    if(inputs.countryID === []) error.countryID = "Porfavor seleccione al menos un pais para la actividad";

    return error;
};