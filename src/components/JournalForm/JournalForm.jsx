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
         dispatchForm({ type: "CLEAR" });
      }
   }, [isFormReadyToSubmit, values, onSubmit]);

   const addJournalItem = (e) => {
      e.preventDefault();
      // const formData = new FormData(e.target);
      // const formProps = Object.fromEntries(formData);
      dispatchForm({ type: "SUBMIT" });
   };

   const onChange = (e) => {
      dispatchForm({
         type: "SET_VALUE",
         payload: { [e.target.name]: e.target.value },
      });
   };

   return (
      <form className={styles["journal-form"]} onSubmit={addJournalItem}>
         <div>
            <input
               type="text"
               name="title"
               onChange={onChange}
               value={values.title}
               className={cn(styles["input-title"], {
                  [styles["invalid"]]: !isValid.title,
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
               onChange={onChange}
               value={values.date}
               className={cn(styles["input"], {
                  [styles["invalid"]]: !isValid.date,
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
               onChange={onChange}
               value={values.tag}
               className={styles["input"]}
            />
         </div>

         <textarea
            name="text"
            id=""
            cols="30"
            rows="10"
            onChange={onChange}
            value={values.text}
            className={cn(styles["input"], {
               [styles["invalid"]]: !isValid.text,
            })}
         ></textarea>
         <Button text="Сохранить" />
      </form>
   );
};

export default JournalForm;
