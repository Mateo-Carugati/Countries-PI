import { useSelector } from "react-redux";
import Paginate from './Paginate/Paginate';
import Card from "./Card/Card";
import style from './Cards.module.css';

export default function Cards() {
    // Obtener los datos relevantes del estado utilizando useSelector de react-redux
    const { showCountries, numPage } = useSelector(state => state);
    // Calcular el rango de países que se mostrarán en la página actual
    let from = (numPage - 1) * 10;
    let to = numPage * 10;
    let viewCountries = showCountries.slice(from, to);

    return (
        <div className={style.contains} >

            <div className={style.cards}>
                {/* Mapear los países que se mostrarán en la página actual y renderizar el componente Card */}
                {viewCountries && viewCountries.map(country => <Card 
                    key={country.id}
                    id={country.id}
                    flag={country.flag}
                    name={country.name}
                    continent={country.continent}
                />)}
            </div>

            <div className={style.paginate} >
                {/* Renderizar el componente Paginate para la paginación */}
                <Paginate />
            </div>

        </div>
    );
};
