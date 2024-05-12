import { useContext, useEffect, useReducer, useRef } from "react";

import styles from "./JournalForm.module.css";
import cn from "classnames";

import { CiCalendar } from "react-icons/ci";
import { CiFolderOn } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";

import { INITIAL_STATE, formReducer } from "./JournalForm.state";

import Button from "../Button/Button";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";

const JournalForm = ({ onSubmit, data, onDelete }) => {
   const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
   const { isValid, isFormReadyToSubmit, values } = formState;
   const titleRef = useRef();
   const dateRef = useRef();
   const textRef = useRef();
   const { userId } = useContext(UserContext);

   const addJournalItem = (e) => {
      e.preventDefault();
      dispatchForm({ type: "SUBMIT" });
   };

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
      if (!data) {
         dispatchForm({ type: "CLEAR" });
         dispatchForm({
            type: "SET_VALUE",
            payload: { userId },
         });
      }
      dispatchForm({
         type: "SET_VALUE",
         payload: { ...data },
      });
   }, [data]);

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
         dispatchForm({
            type: "SET_VALUE",
            payload: { userId },
         });
      }
   }, [isFormReadyToSubmit, values, onSubmit, userId]);

   useEffect(() => {
      dispatchForm({
         type: "SET_VALUE",
         payload: { userId },
      });
   }, [userId]);

   const onChange = (e) => {
      dispatchForm({
         type: "SET_VALUE",
         payload: { [e.target.name]: e.target.value },
      });
   };

   const deleteJournalItem = () => {
      onDelete(data.id);
      dispatchForm({ type: "CLEAR" });
      dispatchForm({
         type: "SET_VALUE",
         payload: { userId },
      });
   };

   return (
      <form className={styles["journal-form"]} onSubmit={addJournalItem}>
         <div className={styles["form-row"]}>
            <Input
               type="text"
               name="title"
               ref={titleRef}
               onChange={onChange}
               value={values.title}
               appearence="title"
               isValid={isValid.title}
            />
            {data?.id && (
               <button
                  className={styles["deleteButton"]}
                  onClick={() => deleteJournalItem()}
               >
                  <AiFillDelete
                     alt="Кнопка удалить"
                     className={styles["delete"]}
                  />
               </button>
            )}
         </div>
         <div className={styles["form-row"]}>
            <label htmlFor="date" className={styles["form-label"]}>
               <CiCalendar alt="иконка календаря" className="svg" />
               <span>Дата</span>
            </label>
            <Input
               id="date"
               type="date"
               name="date"
               ref={dateRef}
               onChange={onChange}
               value={
                  values.date
                     ? new Date(values.date).toISOString().slice(0, 10)
                     : ""
               }
               isValid={isValid.date}
            />
         </div>

         <div className={styles["form-row"]}>
            <label htmlFor="tag" className={styles["form-label"]}>
               <CiFolderOn alt="иконка папки" className="svg" />
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
