import style from './ErrorPage.module.css';

export default function ErrorPage(){
    return(
        <div className={style.contains} >
            <h1>ERROR 404</h1>
            <h4>LA PAGINA NO EXISTE</h4>
        </div>
    );
}