import { useState } from "react";

import "./Button.css";

function Button({ name }) {
   const [text, setText] = useState(name);

   function handleClick() {
      setText("закрыть");
      console.log("click");
   }
   return (
      <>
         <button className="button accent" onClick={handleClick}>
            {text}
         </button>
      </>
   );
}

export default Button;
