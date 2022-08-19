import styles from "./pagination.module.css";
import { useState } from "react";

function Pagination({ pagina, setPagina, numMaxPag }) {
    const [input, setInput] = useState(1);

    const nextPage = () => {
        setInput(input + 1);
        setPagina(pagina + 1);
    }

    const prevPage = () => {
        setInput(input - 1);
        setPagina(pagina - 1);
    }

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            setPagina(parseInt(e.target.value));
            if (parseInt(e.target.value) < 1 || parseInt(e.target.value) > numMaxPag || isNaN(parseInt(e.target.value))) {
                setInput(1);
                setPagina(1);
            } else {
                setPagina(parseInt(e.target.value));
            }
        }
    }

    const onChange = (e) => {
        setInput(e.target.value)
    }

    return (
        <>
            <div className={styles.pagination}>
                <button disabled={pagina <= 1} onClick={prevPage}>Prev</button>
                <input onChange={(e) => onChange(e)} onKeyDown={(e) => onKeyDown(e)} type="text" name="page" autoComplete="off" value={input} />
                <span>of {numMaxPag}</span>
                <button disabled={pagina >= numMaxPag} onClick={nextPage}>Next</button>
            </div>
        </>
    )
}

export default Pagination;