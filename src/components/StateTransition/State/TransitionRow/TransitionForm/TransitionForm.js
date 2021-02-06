import { useState } from "react";
import "./TransitionForm.css";

const initiailData = {
  message: "",
  keywords: [],
  end: "",
  spareContent: "",
  intent: "",
  transitionState: "",
  type: "",
};

const TransitionForm = ({ stateId, transitionId }) => {
  const [data, setData] = useState(initiailData);

  return (
    <form className="transition-form" onSubmit={() => console.log("Submitted")}>
      <div className="form-light-input">
        <label>
          Message
          <input name="message" type="text"></input>
        </label>
      </div>
      <div className="form-light-input">
        <label>
          Keywords
          <input name="keywords" type="text"></input>
        </label>
      </div>

      <div className="form-light-input">
        <label>
          End
          <input name="end" type="text"></input>
        </label>
      </div>
      <div className="form-light-input">
        <label>
          Spare Content
          <input name="spare-content" type="text"></input>
        </label>
      </div>

      <div className="form-light-input">
        <label>
          Intent
          <input name="intent" type="text"></input>
        </label>
      </div>

      <div className="form-light-input">
        <label>
          Transition State
          <input name="transition-state" type="text"></input>
        </label>
      </div>

      <div className="form-light-input">
        <label>
          Type
          <input name="type" type="text"></input>
        </label>
      </div>

      <button type="submit" className="dark-btn">
        ADD
      </button>
    </form>
  );
};

export default TransitionForm;
