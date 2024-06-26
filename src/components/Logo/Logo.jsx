import styles from "./Logo.module.css";

const Logo = ({ logo }) => {
   return <h2 className={styles.logo}>{logo}</h2>;
};

export default Logo;
