import PropTypes from "prop-types";
import "./Button.css";

function Button({ name }) {
   return (
      <>
         <button className="button accent">{name}</button>
      </>
   );
}
Button.propTypes = {
   name: PropTypes.string.isRequired,
   class: PropTypes.string.isRequired,
};

export default Button;
