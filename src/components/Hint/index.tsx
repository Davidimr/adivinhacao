import styles from "./styles.module.css"
import tipIcon from "../../../assets/tip.svg"
type Props = {
    hint: string
}

export function Hint({hint}: Props){
     return (
     <div className={styles.tip} >
        <img className={styles.icon} src={tipIcon} alt="icone da dica"  />

        <div >
            <h3>Dica</h3>
            <p>{hint}</p>
        </div>
    
     </div>)
}