import "./SelectInput.css";

const SelectInput = ({
  label,
  labelClassName,
  inputClassName,
  name,
  dark,
  options,
  value,
  ...rest
}) => {
  return (
    <div className={"form-input " + (dark ? "dark" : "light")}>
      <label className={labelClassName}>
        {label}
        <select
          className={inputClassName}
          name={name}
          // type="text"
          {...rest}
          value={value || "None"}
        >
          <option value={"None"}>None</option>
          {options &&
            options.map((op, key) => {
              return (
                <option key={key} value={op.value}>
                  {op.label}
                </option>
              );
            })}
        </select>
      </label>
    </div>
  );
};
export default SelectInput;
