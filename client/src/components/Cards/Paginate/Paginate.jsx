import { useDispatch, useSelector } from 'react-redux';
import { firstPage, lastPage, nextPage, prevPage } from '../../../redux/actions/actions';
import style from './Paginate.module.css';

export default function Paginate() {
    // Utilizar useDispatch para obtener el método dispatch de Redux
    const dispatch = useDispatch();
    // Obtener los datos relevantes del estado utilizando useSelector de react-redux
    const { numPage, cantPages } = useSelector((state) => state);

    // Definir las funciones para los botones de paginación
    const next = () => dispatch(nextPage());
    const prev = () => dispatch(prevPage());
    const first = () => dispatch(firstPage());
    const last = () => dispatch(lastPage());

    return (
        <div className={style.contains} >
            {/* Botón para ir a la primera página */}
            {numPage > 1 ? 
                <div className={style.buttonDistance} >
                    <button className={style.button} onClick={first} >{`<<<`}</button>
                </div> : 
                null}

            {/* Botón para ir a la página anterior */}
            {numPage > 1 ? ( 
                <div className={style.buttonDistance}> 
                    <button className={style.button} onClick={prev}>{`< ${numPage - 1}`}</button>
                </div>) : null}

            {/* Número de página actual */}
            <div className={style.number} >{numPage}</div>

            {/* Botón para ir a la página siguiente */}
            {numPage < cantPages ? <div className={style.buttonDistance}>
                <button className={style.button} onClick={next}>{`${numPage + 1} >`}</button>
                </div> : null}

            {/* Botón para ir a la última página */}
            {numPage < cantPages ? 
                <div className={style.buttonDistance} >
                    <button className={style.button} onClick={last} >{`>>>`}</button>
                </div> : null}
        </div>
    );
};
