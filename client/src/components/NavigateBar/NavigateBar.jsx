import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Navigate.module.css";

export default function NavigateBar() {
  return (
    <div className={style.contains}>
      <div className={style.leftSection}>
        <Link className={style.Link} to="/">
          INICIO
        </Link>
        <Link className={style.Link} to="/activity">
          CREAR ACTIVIDAD
        </Link>
      </div>
      <div className={style.Search}>
        <SearchBar />
      </div>
    </div>
  );
}
