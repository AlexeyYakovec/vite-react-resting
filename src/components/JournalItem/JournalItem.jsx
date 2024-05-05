import PropTypes from "prop-types";
import "./JournalItem.css";

const JournalItem = ({ data }) => {
   const formatDate = new Intl.DateTimeFormat("ru-RU").format(data.date);
   return (
      <div className="journal-item">
         <h2 className="journal-item__header">{data[0].title}</h2>
         <section className="journal-item__body">
            <div className="journal-item__date">{formatDate}</div>
            <div className="journal-item__text">{data[0].text}</div>
         </section>
      </div>
   );
};

JournalItem.propTypes = {
   data: PropTypes.array.isRequired,
};
export default JournalItem;
