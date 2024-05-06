// import { useState } from "react";
import "./JournalForm.css";

import Button from "../Button/Button";
import { useState } from "react";

const JournalForm = ({ onSubmit }) => {
   const [formValidateState, setFormValidateState] = useState({
      title: true,
      text: true,
      date: true,
   });

   const addJournalItem = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);
      let isFormValid = true;
      if (!formProps.title.trim().length) {
         setFormValidateState((state) => ({ ...state, title: false }));
         isFormValid = false;
      }
      if (!formProps.text.trim().length) {
         setFormValidateState((state) => ({ ...state, text: false }));
         isFormValid = false;
      }
      if (!formProps.date) {
         setFormValidateState((state) => ({ ...state, date: false }));
         isFormValid = false;
      }
      if (!isFormValid) {
         return;
      }

      onSubmit(formProps);
   };

   return (
      <form className="journal-form" onSubmit={addJournalItem}>
         <input type="text" name="title" />
         <input type="date" name="date" />
         <input type="text" name="tag" />
         <textarea name="text" id="" cols="30" rows="10"></textarea>
         <Button text="Сохранить" />
      </form>
   );
};

export default JournalForm;
