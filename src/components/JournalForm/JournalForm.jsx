import { useEffect, useReducer } from "react";
import styles from "./JournalForm.module.css";
import cn from "classnames";

import { CiCalendar } from "react-icons/ci";
import { CiFolderOn } from "react-icons/ci";

import Button from "../Button/Button";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";

const JournalForm = ({ onSubmit }) => {
   const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
   const { isValid, isFormReadyToSubmit, values } = formState;

   useEffect(() => {
      let timerId;
      if (!isValid.date || !isValid.text || !isValid.title) {
         timerId = setTimeout(() => {
            dispatchForm({ type: "RESET_VALIDITY" });
         }, 2000);

         return () => {
            clearTimeout(timerId);
         };
      }
   }, [isValid]);

   useEffect(() => {
      if (isFormReadyToSubmit) {
         onSubmit(values);
      }
   }, [isFormReadyToSubmit]);

   const addJournalItem = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);
      console.log(`formProps: `, formProps);
      dispatchForm({ type: "SUBMIT", payload: formProps });
   };

   return (
      <form className={styles["journal-form"]} onSubmit={addJournalItem}>
         <div>
            <input
               type="text"
               name="title"
               className={cn(styles["input-title"], {
                  [styles["invalid"]]: !formState.isValid.title,
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
                  [styles["invalid"]]: !formState.isValid.date,
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
               [styles["invalid"]]: !formState.isValid.text,
            })}
         ></textarea>
         <Button text="Сохранить" />
      </form>
   );
};

export default JournalForm;
