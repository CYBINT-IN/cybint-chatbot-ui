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
  const [state, setState] = useState(value);
  useEffect(() => {
    if (onChange) {
      onChange(state);
    }
  }, [state]);
  useEffect(() => {
    if (value) setState(true);
    else setState(false);
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
