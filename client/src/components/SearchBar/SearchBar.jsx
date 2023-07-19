import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from 'react-redux';
import {searchCountries} from '../../redux/actions/actions';
import style from './SearchBar.module.css';

export default function SearchBar(){

    let [name, setName] = useState("");
    const dispatch = useDispatch();

    const handleChange = (event) => setName(event.target.value);
    
    return (
        <div className={style.contains} >
            <input className={style.input} type="search" onChange={handleChange} />
            <Link to="/home" >
                <button className={style.button} onClick={() => dispatch(searchCountries(name))} >🔎</button>
            </Link>
        </div>
    );
};