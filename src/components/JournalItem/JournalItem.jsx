import "./JournalItem.css";

const JournalItem = ({ title, text, date }) => {
   const formatDate = new Intl.DateTimeFormat("ru-RU").format(date);
   return (
      <>
         <h2 className="journal-item__header">{title}</h2>
         <section className="journal-item__body">
            <div className="journal-item__date">{formatDate}</div>
            <div className="journal-item__text">{text}</div>
         </section>
      </>
   );
};

export default JournalItem;
