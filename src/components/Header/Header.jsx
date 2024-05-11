import { useState } from "react";

import SelectUser from "../SelectUser/SelectUser";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";

const logos = ["Personal journal", "Personal Todos"];

const Header = () => {
   const [logoIndex, setLogoIndex] = useState(0);

   const toggleLogo = () => {
      setLogoIndex((pervState) => Number(!pervState));
   };
   return (
      <>
         <Logo logo={logos[logoIndex]} />
         <SelectUser />
         <Button onClick={toggleLogo}>Сменить лого</Button>
      </>
   );
};

export default Header;
