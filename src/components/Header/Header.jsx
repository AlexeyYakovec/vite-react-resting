import SelectUser from "../SelectUser/SelectUser";
import Logo from "../Logo/Logo";

const Header = () => {
   return (
      <>
         <Logo logo="Personal journal" />
         <SelectUser />
      </>
   );
};

export default Header;
