
import styles from './pokemon.module.css';

const Pokemon = (props) => {
    const urlImgDefect="https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png";
    return (
        <>
            <div className={styles.card}>
                <img src={props.pokemon.image ? props.pokemon.image: urlImgDefect } alt={props.pokemon.name} />
                <h2 className={styles.title_card}>{props.pokemon.name}</h2>
                <div className={styles.container_types}>
                    {props.pokemon.types.map(t => (
                        <span key={t}>
                            {t}
                        </span>
                    ))}

                </div>
            </div>
        </>
    )
}

export default Pokemon;