import logo from "../../../assets/logo.png"
import styles from "./Header.module.css"
import restart from "../../../assets/restart.svg"

type Props = {
	current: number 
	max: number 
	onRestart: () => void
}

export function Header({current, max, onRestart}: Props) {
    return (
        <div className={styles.container}>
            <img className={styles.mainLogo} src={logo} alt="logo" />
            <header>
                <span>
                    <strong>{current}</strong> de {max} tentativas
                </span>
                <button type="button" onClick={onRestart}>
                    <img className={styles.imgButton} src={restart} alt="restart logo" />
                </button>
            </header>
        </div>
    )
}