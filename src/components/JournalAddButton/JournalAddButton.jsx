import { FaPlus } from "react-icons/fa";

import CardButton from "../CardButton/CardButton";
import "./JournalAddButton.css";

const JournalAddButton = ({ clearForm }) => {
   return (
      <CardButton className="journal-add" onClick={clearForm}>
         <FaPlus />
         Новое воспоминание
      </CardButton>
   );
};

export default JournalAddButton;
