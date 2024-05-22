import "./Button.css";

const Button = ({ title, onClick }) => (
  <button className="start-button" onClick={onClick}>
    {title}
  </button>
);

export default Button;
