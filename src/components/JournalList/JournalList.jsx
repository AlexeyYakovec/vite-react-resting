import "./JournalList.css";

import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

const JournalList = ({ items }) => {
   const { userId } = useContext(UserContext);
   const sortItems = (a, b) => {
      if (a.date < b.date) {
         return 1;
      } else {
         return -1;
      }
   };
   return (
      <div className="journal-list">
         {items.length === 0 ? (
            <p>Добавьте пожалуйста первую запись</p>
         ) : (
            items
               .filter((item) => item.userId === userId)
               .sort(sortItems)
               .map((item) => {
                  return (
                     <CardButton key={item.id}>
                        <JournalItem
                           title={item.title}
                           text={item.text}
                           date={item.date}
                        />
                     </CardButton>
                  );
               })
         )}
      </div>
   );
};

export default JournalList;
