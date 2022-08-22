import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes, filterType, filterExistDB,orderName } from "../../redux/actions";
import styles from "./filterOrder.module.css";

const FilterOrder = ({setInputPag,setPagina, setOrden}) => {
  const dispatch = useDispatch();
  const infoTypes = useSelector(state => state.types);

  

  useEffect(() => {
    dispatch(getAllTypes())
  }, [])

  const handleFilterType = (e) => {
    dispatch(filterType(e.target.value))
    setPagina(1)
    setInputPag(1)
  }

  const handleFilterExistDb = (e) => {
    dispatch(filterExistDB(e.target.value))
    setPagina(1)
    setInputPag(1)
  }

  const handleOrderName=(e)=>{
  dispatch(orderName(e.target.value));
  setPagina(1);
  setInputPag(1)
  setOrden(`ordenado ${e.target.value}`)
  }

  return (
    <>
      <div className={styles.divFilter}>
        <span>TIPOS</span>
        <select onChange={(e) => handleFilterType(e)} className={styles.select}>
          <option value="All">ALL</option>
          {infoTypes?.map(el => (

            <option value={el.name} key={el.id}>{el.name}</option>
          ))}

        </select>
      </div>

      <div className={styles.divFilter}>
        <span>API/DB</span>
        <select onChange={(e)=>handleFilterExistDb(e)} className={styles.select}>
          <option value="All">ALL</option>
          <option value="Api">Api</option>
          <option value="Mibd">Mi db</option>

        </select>
      </div>

      <div className={styles.divFilter}>
        <span>ORDENAR</span>
        <select onChange={(e) => handleOrderName(e)} className={styles.select}>
        <option value="ID">ID</option>
          <option value="Asc">A-Z</option>
          <option value="Desc">Z-A</option>
          <option value="maxAttack">Max Attack</option>
          <option value="minAttack">Min Attack</option>
        </select>
      </div>
    </>
  )
}

export default FilterOrder;