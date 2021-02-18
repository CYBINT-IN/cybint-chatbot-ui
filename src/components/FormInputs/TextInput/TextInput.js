import "./TextInput.css";

const TextInput = ({
  label,
  labelClassName,
  inputClassName,
  name,
  dark,
  value,
  ...rest
}) => {
  return (
    <div className={"form-input " + (dark ? "dark" : "light")}>
      <label className={labelClassName}>
        {label}
        <input
          className={inputClassName}
          name={name}
          type="text"
          value={value || ""}
          {...rest}
        ></input>
      </label>
    </div>
  );
};
export default TextInput;
