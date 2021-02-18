import { useState, useEffect } from "react";
import "./CheckBoxInput.css";

const CheckBoxInput = ({
  label,
  onChange,
  value,
  inputClassName,
  name,
  ...rest
}) => {
  const [state, setState] = useState(false);
  useEffect(() => {
    if (onChange) {
      onChange(state);
    }
  }, [state]);
  useEffect(() => {
    setState(value);
  }, []);
  return (
    <input
      value={label + (state ? ": true" : ": false")}
      className={inputClassName + " btn" + (state ? " dark" : " inactive")}
      name={name}
      onClick={() => setState((st) => !st)}
      type="button"
      {...rest}
    ></input>
  );
};
export default CheckBoxInput;
