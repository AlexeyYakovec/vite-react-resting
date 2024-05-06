// import { useState } from "react";
import styles from "./JournalForm.module.css";

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
      } else {
         setFormValidateState((state) => ({ ...state, title: true }));
      }

      if (!formProps.text.trim().length) {
         setFormValidateState((state) => ({ ...state, text: false }));
         isFormValid = false;
      } else {
         setFormValidateState((state) => ({ ...state, text: true }));
      }

      if (!formProps.date) {
         setFormValidateState((state) => ({ ...state, date: false }));
         isFormValid = false;
      } else {
         setFormValidateState((state) => ({ ...state, date: true }));
      }

      if (!isFormValid) {
         return;
      }

      onSubmit(formProps);
   };

   return (
      <form className={styles["journal-form"]} onSubmit={addJournalItem}>
         <input
            type="text"
            name="title"
            className={`${styles["input"]} ${
               formValidateState.title ? "" : styles["invalid"]
            }`}
         />
         <input
            type="date"
            name="date"
            className={`${styles["input"]} ${
               formValidateState.date ? "" : styles["invalid"]
            }`}
         />
         <input type="text" name="tag" />
         <textarea
            name="text"
            id=""
            cols="30"
            rows="10"
            className={`${styles["input"]} ${
               formValidateState.text ? "" : styles["invalid"]
            }`}
         ></textarea>
         <Button text="Сохранить" />
      </form>
   );
};

export default JournalForm;
