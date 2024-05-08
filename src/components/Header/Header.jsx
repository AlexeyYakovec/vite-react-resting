import SelectUser from "../SelectUser/SelectUser";
import styles from "./Header.module.css";

const Header = () => {
   return (
      <>
         <h2 className={styles.logo}>Personal Journal</h2>
         <SelectUser />
      </>
   );
};

export default Header;
