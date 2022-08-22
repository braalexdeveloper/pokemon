import styles from "./pagination.module.css";
import { useState } from "react";

function Pagination({ inputPag,setInputPag,pagina, setPagina, numMaxPag }) {
    
    const nextPage = () => {
        setInputPag(inputPag + 1);
        setPagina(pagina + 1);
    }

    const prevPage = () => {
        setInputPag(inputPag - 1);
        setPagina(pagina - 1);
    }

    

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            setPagina(parseInt(e.target.value));
            if (parseInt(e.target.value) < 1 || parseInt(e.target.value) > numMaxPag || isNaN(parseInt(e.target.value))) {
                setInputPag(1);
                setPagina(1);
            } else {
                setPagina(parseInt(e.target.value));
            }
        }
    }

    const onChange = (e) => {
        setInputPag(e.target.value)
    }

    return (
        <>
            <div className={styles.pagination}>
                <button disabled={pagina <= 1} onClick={prevPage}>Prev</button>
                <input onChange={(e) => onChange(e)} onKeyDown={(e) => onKeyDown(e)} type="text" name="page" autoComplete="off" value={inputPag} />
                <span>of {numMaxPag}</span>
                <button disabled={pagina >= numMaxPag} onClick={nextPage}>Next</button>
            </div>
        </>
    )
}

export default Pagination;