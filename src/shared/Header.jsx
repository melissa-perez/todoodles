import { NavLink } from 'react-router';
import styles from './Header.module.css';
function Header({ title }) {
  return (
    <>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => {
            if (isActive) return styles.active;
            return styles.inactive;
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => {
            if (isActive) return styles.active;
            return styles.inactive;
          }}
        >
          About
        </NavLink>
      </nav>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.container}></div>
    </>
  );
}

export default Header;
