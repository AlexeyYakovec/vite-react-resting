import { useContext, useEffect, useReducer, useRef } from "react";

import styles from "./JournalForm.module.css";
import cn from "classnames";

import { CiCalendar } from "react-icons/ci";
import { CiFolderOn } from "react-icons/ci";

import { INITIAL_STATE, formReducer } from "./JournalForm.state";

import Button from "../Button/Button";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";

const JournalForm = ({ onSubmit }) => {
   const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
   const { isValid, isFormReadyToSubmit, values } = formState;
   const titleRef = useRef();
   const dateRef = useRef();
   const textRef = useRef();
   const { userId } = useContext(UserContext);

   const focusError = (isValid) => {
      switch (true) {
         case !isValid.title:
            titleRef.current.focus();
            break;
         case !isValid.date:
            dateRef.current.focus();
            break;
         case !isValid.text:
            textRef.current.focus();
            break;
      }
   };

   useEffect(() => {
      let timerId;
      if (!isValid.date || !isValid.text || !isValid.title) {
         focusError(isValid);
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

   useEffect(() => {
      dispatchForm({
         type: "SET_VALUE",
         payload: { userId },
      });
   }, [userId]);

   const addJournalItem = (e) => {
      e.preventDefault();
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
         {userId}
         <div>
            <Input
               type="text"
               name="title"
               ref={titleRef}
               onChange={onChange}
               value={values.title}
               appearence="title"
               isValid={isValid.title}
            />
         </div>
         <div className={styles["form-row"]}>
            <label htmlFor="date" className={styles["form-label"]}>
               <CiCalendar alt="иконка календаря" />
               <span>Дата</span>
            </label>
            <Input
               id="date"
               type="date"
               name="date"
               ref={dateRef}
               onChange={onChange}
               value={values.date}
               isValid={isValid.date}
            />
         </div>
         <div className={styles["form-row"]}>
            <label htmlFor="tag" className={styles["form-label"]}>
               <CiFolderOn alt="иконка папки" />
               <span>Метки</span>
            </label>
            <Input
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
            ref={textRef}
            onChange={onChange}
            value={values.text}
            className={cn(styles["input"], {
               [styles["invalid"]]: !isValid.text,
            })}
         ></textarea>
         <Button>Сохранить</Button>
      </form>
   );
};

export default JournalForm;
