import { FaPlus } from "react-icons/fa";

import CardButton from "../CardButton/CardButton";
import "./JournalAddButton.css";

const JournalAddButton = () => {
   return (
      <CardButton className="journal-add">
         <FaPlus />
         Новое воспоминание
      </CardButton>
   );
};

export default JournalAddButton;
