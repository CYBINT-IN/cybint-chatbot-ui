import { useEffect, useState } from "react";
import getKeywords from "../../../../../utils/getKeywords";
import CheckBoxInput from "../../../../FormInputs/CheckBoxInput/CheckBoxInput";
import SelectInput from "../../../../FormInputs/SelectInput/SelectInput";
import TextInput from "../../../../FormInputs/TextInput/TextInput";
import { useStateTrans } from "../../../../../contexts/stateTransitionContext";
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

const TransitionForm = ({ state, transitionIndex }) => {
  const { stateTransData, updateTransInState } = useStateTrans();
  const [data, setData] = useState();
  const [stateOptions, setStateOptions] = useState();
  // const [transitionIndex, setTransitionIndex] = useState(transIndex);
  // useEffect(() => {
  //   setTransitionIndex(transIndex);
  // }, [transIndex]);
  useEffect(() => {
    const transition = { ...state.transitions[transitionIndex] };
    if (transition.keywords) {
      console.log(transition.keywords);
      transition.keywords = transition.keywords.join(", ");
      setData(transition);
    }
  }, [transitionIndex]);

  useEffect(() => {
    if (stateTransData) {
      const opts = stateTransData.map((st, i) => {
        return { value: st._id, label: `State ${i + 1}` };
      });
      setStateOptions(opts);
    }
  }, [stateTransData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submittedData = { ...data };
    submittedData.keywords = getKeywords(submittedData.keywords);
    if (submittedData.state === "None") {
      delete submittedData.state;
    }
    console.log(submittedData);
    await updateTransInState(state._id, submittedData, transitionIndex);
  };

  return (
    <form className="transition-form" onSubmit={handleSubmit}>
      <TextInput
        label="Statement"
        name="statement"
        value={data && data.statement}
        onChange={(e) =>
          setData((data) => ({ ...data, statement: e.target.value }))
        }
      />
      <TextInput
        label="Keywords"
        name="keywords"
        value={data && data.keywords}
        onChange={(e) => {
          setData((data) => ({ ...data, keywords: e.target.value }));
        }}
      />
      <CheckBoxInput
        label="End"
        name="end"
        onChange={(val) => setData({ ...data, end: val })}
        value={data && data.end}
      />
      <TextInput
        label="Spare Content"
        name="spare-content"
        onChange={(e) =>
          setData((data) => ({ ...data, spareContent: e.target.value }))
        }
        value={data && data.spareContent}
      />
      <TextInput
        label="Intent"
        name="intent"
        onChange={(e) =>
          setData((data) => ({ ...data, intent: e.target.value }))
        }
        value={data && data.intent}
      />
      <SelectInput
        label="Transition State"
        name="transition-state"
        options={stateOptions}
        value={data && data.state}
        onChange={(e) => {
          setData((data) => ({ ...data, state: e.target.value }));
        }}
      />
      <TextInput
        label="Type"
        name="type"
        value={data && data.type}
        onChange={(e) => setData((data) => ({ ...data, type: e.target.value }))}
      />
      <button type="submit" className="dark btn">
        ADD
      </button>
    </form>
  );
};

export default TransitionForm;
