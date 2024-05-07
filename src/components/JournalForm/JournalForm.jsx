// import { useState } from "react";
import styles from "./JournalForm.module.css";
import cn from "classnames";
import { useState } from "react";

import { CiCalendar } from "react-icons/ci";
import { CiFolderOn } from "react-icons/ci";

import Button from "../Button/Button";

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
         <div>
            <input
               type="text"
               name="title"
               className={cn(styles["input-title"], {
                  [styles["invalid"]]: !formValidateState.title,
               })}
            />
         </div>
         <div className={styles["form-row"]}>
            <label htmlFor="date" className={styles["form-label"]}>
               <CiCalendar alt="иконка календаря" />
               <span>Дата</span>
            </label>
            <input
               id="date"
               type="date"
               name="date"
               className={cn(styles["input"], {
                  [styles["invalid"]]: !formValidateState.title,
               })}
            />
         </div>
         <div className={styles["form-row"]}>
            <label htmlFor="tag" className={styles["form-label"]}>
               <CiFolderOn alt="иконка папки" />
               <span>Метки</span>
            </label>
            <input
               id="tag"
               type="text"
               name="tag"
               className={styles["input"]}
            />
         </div>

         <textarea
            name="text"
            id=""
            cols="30"
            rows="10"
            className={cn(styles["input"], {
               [styles["invalid"]]: !formValidateState.title,
            })}
         ></textarea>
         <Button text="Сохранить" />
      </form>
   );
};

export default JournalForm;
