import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getAllActivities, getAllCountries} from "../../redux/actions/actions";
import Cards from "../../components/Cards/Cards";
import FilterOrderBar from "../../components/Cards/FilterOrderBar/FilterOrderBar";
import style from './HomePage.module.css';
import NavigateBar from "../../components/NavigateBar/NavigateBar";


export default function HomePage(){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllActivities());
        dispatch(getAllCountries());
    }, []);

    return (
        <div className={style.contains} >
                
            <NavigateBar />

            <div className={style.filter} >
                <FilterOrderBar />
            </div>

            <div className={style.cards}>
                <Cards />
            </div>

        </div>
    )
};