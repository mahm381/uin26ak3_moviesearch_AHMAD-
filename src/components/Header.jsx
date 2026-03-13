// Header-komponenten vises øverst på alle sider
// Link fra react,router-dom brukes for å navigere tilbake til forsiden uten å laste siden på nytt
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  return (

    <header className={styles.header}>
            {/* Logo er en klikkbar lenke som tar brukeren tilbake til forsiden */}

      <Link to="/" className={styles.logo}>
        {/* Første del av logoen er rød for visuell kontrast */}

        <span className={styles.logoAccent}>MOVIE</span>SEARCH
      </Link>
    </header>
  )
}