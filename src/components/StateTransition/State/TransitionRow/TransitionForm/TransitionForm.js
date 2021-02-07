import { useState } from "react";
import TextInput from "../../../../FormInputs/TextInput/TextInput";
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
      <TextInput label="Message" name="message" />
      <TextInput label="Keywords" name="keywords" />
      <TextInput label="End" name="end" />
      <TextInput label="Spare Content" name="spare-content" />
      <TextInput label="Intent" name="intent" />
      <TextInput label="Transition State" name="transition-state" />
      <TextInput label="Type" name="type" />
      <button type="submit" className="dark btn">
        ADD
      </button>
    </form>
  );
};

export default TransitionForm;
