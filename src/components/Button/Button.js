import "./button.css";

const Button = ({ disabled, onClick, name, children }) => {
  return (
    <button
      className={disabled ? "button disabled-button" : "button"}
      onClick={onClick}
      name={name}
    >
      {children}
    </button>
  );
};

export default Button;
