import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllTypes, createPokemon } from '../../redux/actions';


import styles from "./createPokemon.module.css";

function validate(input) {
    let errors = {};
    const pattern = new RegExp('^[A-Z]+$', 'i');

    /*if (!input.name) {
        errors.name = 'Este campo es obligatorio';
    }*/
    if (!pattern.test(input.name)) {
        errors.name = 'No se aceptan números'
    }

  /*else if(input.image===''){
    errors.image="imagen obligatoria"
  }*/else if (input.life <= 0 || input.life > 100) {
        errors.life = "Ingresa un número valido 1 - 100"
    } else if (input.attack <= 0 || input.attack > 100) {
        errors.attack = "Ingresa un número valido 1 - 100"
    }
    else if (input.defense <= 0 || input.defense > 100) {
        errors.defense = "Ingresa un número valido 1 - 100"
    }

    else if (input.speed <= 0 || input.speed > 100) {
        errors.speed = "Ingresa un número valido 1 - 100"
    } else if (input.height <= 0 || input.height > 100) {
        errors.height = "Ingresa un número valido 1 - 100"
    } else if (input.weight <= 0 || input.weight > 100) {
        errors.weight = "Ingresa un número valido 1 - 100"
    }else if(input.types.length<1){
        errors.types = "Ingresa un tipo o más"
    }

    return errors;
}

const CreatePokemon = () => {
    const infoTypes = useSelector(state => state.types);
    const dispatch = useDispatch();
    const history = useHistory();
    const [input, setInput] = useState({
        name: '',
        image: '',
        life: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: []
    });

    const [errors, setErrors] = useState({});





    useEffect(() => {
        dispatch(getAllTypes())
    }, [])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelected = (e) => {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })

        setErrors(validate({
            ...input,
            types: [...input.types, e.target.value]
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPokemon(input))
        history.push('/home')
    }

    const urlImgDefect = "https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png";

    return (
        <>
            <div className={styles.container}>
                <div>
                    <h2 className={styles.titulos}>CREATE POKEMON</h2>
                </div>

                <div>
                    <h2 className={styles.titulos}>PREVIEW</h2>
                </div>

                <div className={styles.divFomr}>
                    <form onSubmit={(e) => handleSubmit(e)}>

                        <div>
                            <label>
                                Name:
                            </label>
                            <input type="text" name="name" value={input.name} onChange={(e) => handleChange(e)} required placeholder="Ingrese un nombre"  />
                            <div className={styles.divError}>{errors.name && (<span>{errors.name}</span>)}</div>
                        </div>

                        <div>
                            <label>
                                Image:
                            </label>
                            <input type="text" name="image" value={input.image} onChange={(e) => handleChange(e)} placeholder="Ingrese url de la imagen"  />
                            <div className={styles.divError}>{errors.image && (<span>{errors.image}</span>)}</div>
                        </div>

                        <div>
                            <label>
                                Life:
                            </label>
                            <input type="number" name="life" value={input.life} onChange={(e) => handleChange(e)} placeholder="Ingrese un número"  />
                            <div className={styles.divError}>{errors.life && (<span>{errors.life}</span>)}</div>
                        </div>

                        <div>
                            <label>
                                Attack:
                            </label>
                            <input type="number" name="attack" value={input.attack} onChange={(e) => handleChange(e)} placeholder="Ingrese un número"  />
                            <div className={styles.divError}>{errors.attack && (<span>{errors.attack}</span>)}</div>
                        </div>

                        <div>
                            <label>
                                Defense:
                            </label>
                            <input type="number" name="defense" value={input.defense} onChange={(e) => handleChange(e)} placeholder="Ingrese un número"  />
                            <div className={styles.divError}>{errors.defense && (<span>{errors.defense}</span>)}</div>
                        </div>

                        <div>
                            <label>
                                Speed:
                            </label>
                            <input type="number" name="speed" value={input.speed} onChange={(e) => handleChange(e)} placeholder="Ingrese un número" />
                            <div className={styles.divError}>{errors.speed && (<span>{errors.speed}</span>)}</div>
                        </div>

                        <div>
                            <label>
                                Height(m):
                            </label>
                            <input type="number" name="height" value={input.height} onChange={(e) => handleChange(e)} placeholder="Ingrese un número"  />
                            <div className={styles.divError}>{errors.height && (<span>{errors.height}</span>)}</div>
                        </div>

                        <div>
                            <label>
                                Weight(kg):
                            </label>
                            <input type="number" name="weight" value={input.weight} onChange={(e) => handleChange(e)} placeholder="Ingrese un número"  />
                            <div className={styles.divError}>{errors.weight && (<span>{errors.weight}</span>)}</div>
                        </div>

                        <div>
                            <label>
                                Types
                            </label>
                            <select onChange={(e) => handleSelected(e)} required>
                                <option>Selecciona</option>
                                {infoTypes && infoTypes.map(el => (
                                    <option key={el.id} value={el.name}>{el.name}</option>
                                ))}
                            </select>
                            <div className={styles.divError}>{errors.types && (<span>{errors.types}</span>)}</div>
                        </div>

                        <div>
                            <input className={styles.bntSubmit} disabled={input.name && input.life && input.attack && input.defense && input.speed && input.height && input.weight && input.types.length > 0? false : true} type="submit" value="Create" />
                        </div>

                    </form>
                </div>

                <div className={styles.divPreview}>
                    <img src={input.image ? input.image : urlImgDefect} alt={input.name} />
                    <h3>{input.name ? input.name : "name"}</h3>
                    <div className={styles.divTypes}>
                        {input.types.length > 0 ? input.types.map(el => (
                            <span>{el}</span>
                        )) : <span>Types</span>}

                    </div>
                </div>

                {/*<div className={styles.respuesta}>
                    <span>POKEMON CREADO CON EXITO</span>
                        </div>*/}


            </div>
        </>
    )
}

export default CreatePokemon;