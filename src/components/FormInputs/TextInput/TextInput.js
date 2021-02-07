import "./TextInput.css";

const TextInput = ({
  label,
  labelClassName,
  inputClassName,
  name,
  dark,
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
          {...rest}
        ></input>
      </label>
    </div>
  );
};
export default TextInput;
