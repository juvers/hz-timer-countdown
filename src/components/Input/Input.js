import "./input.css";

const Input = ({ disabled, value, onChange, name }) => {
  return (
    <input
      className={disabled ? `input disabled-input ${name}` : `input ${name}`}
      type="number"
      name={name}
      value={value}
      onChange={(e) => onChange(e, name)}
    />
  );
};

export default Input;
