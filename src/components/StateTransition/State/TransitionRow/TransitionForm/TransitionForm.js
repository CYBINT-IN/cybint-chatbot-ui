import { useEffect, useState } from "react";
import getKeywords from "../../../../../utils/getKeywords";
import CheckBoxInput from "../../../../FormInputs/CheckBoxInput/CheckBoxInput";
import SelectInput from "../../../../FormInputs/SelectInput/SelectInput";
import TextInput from "../../../../FormInputs/TextInput/TextInput";
import { useStateTrans } from "../../../../../contexts/stateTransitionContext";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import "./TransitionForm.css";
import { ToastsStore } from "react-toasts";

const initiailData = {
  message: "",
  keywords: [],
  end: false,
  spareContent: "",
  intent: "",
  transitionState: "",
  type: "",
};

const TransitionForm = ({ state, transitionIndex, closeFunc }) => {
  const {
    stateTransData,
    updateTransInState,
    getStateNum,
    deleteTransInState,
  } = useStateTrans();
  const [data, setData] = useState({});
  const [stateOptions, setStateOptions] = useState();
  const [isEnd, setIsEnd] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false)
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  };
  useEffect(() => {
    const transition = { ...state.transitions[transitionIndex] };
    if (transition.keywords) {
      console.log(transition.keywords);
      transition.keywords = transition.keywords.join(", ");
    }
    if (!transition.end) transition.end = false;
    if (!transition.state) transition.end = true;
    setData(transition);
  }, [transitionIndex]);

  const handleClose = () => {
    setAlertOpen(false)
  }

  useEffect(() => {
    if (stateTransData) {
      let opts = stateTransData.map((st, i) => {
        return { value: st._id, label: `State ${i + 1}` };
      });
      const newOpts = opts.filter((a) => a.value !== state._id)
      setStateOptions(newOpts);
    }
  }, [stateTransData]);

  useEffect(() => {
    if (stateTransData && getStateNum(state._id) === stateTransData.length) {
      setIsEnd(true);
    }
  }, [stateTransData, state, transitionIndex]);

  useEffect(() => {
    setData((data) => {
      if (data && data.state === "None") {
        return { ...data, end: true };
      }
      return data;
    });
  }, [data.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submittedData = { ...data };
    console.log(submittedData.end, submittedData.state === '')
    if (!submittedData.end && submittedData.state === '') {
      setAlertOpen(true)
      return
    }
    submittedData.keywords = getKeywords(submittedData.keywords);
    if (
      (submittedData.state === "None",
        submittedData.state && submittedData.state.length === 0)
    ) {
      delete submittedData.state;
    }
    console.log(submittedData);
    if (
      !submittedData.state ||
      (submittedData.state && submittedData.state.length === 0)
    )
      submittedData.end = true;
    await updateTransInState(state._id, submittedData, transitionIndex);
    ToastsStore.success("Saved Your Changes");
    closeFunc();
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        key='topcenter'
      >
        <Alert onClose={handleClose} severity='warning'>
          Please Choose a state or mark end as true.
        </Alert>
      </Snackbar>
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
          disabled={false}
          onChange={(end) => setData({ ...data, end })}
          value={data && data.end}
        />
        <TextInput
          label="Spare Content"
          name="spare-content"
          onChange={(e) => {
            setData((data) => ({ ...data, spareContent: e.target.value }));
          }}
          value={data && data.spareContent}
        />
        <TextInput
          label="Intent"
          name="intent"
          onChange={(e) => {
            setData((data) => ({ ...data, intent: e.target.value }));
          }}
          value={data && data.intent}
        />
        <SelectInput
          label="Transition State"
          name="transition-state"
          options={stateOptions}
          value={data && data.state}
          // disabled={isEnd}
          onChange={(e) => {
            if (e.target.value !== '') {
              setData((data) => ({ ...data, end: false, state: e.target.value }));
            } else {
              setData((data) => ({ ...data, end: true, state: e.target.value }));
            }
          }}
        />
        <TextInput
          label="Type"
          name="type"
          value={data && data.type}
          onChange={(e) => setData((data) => ({ ...data, type: e.target.value }))}
        />
        <div className="btn-container">
          <button type="submit" className="dark btn">
            Save
          </button>
          <input
            type="button"
            onClick={async () => {
              await deleteTransInState(state._id, transitionIndex);
              ToastsStore.error("Deleted Transition Successfully");
              closeFunc();
            }}
            className="delete btn"
            value="Delete"
          ></input>
        </div>
      </form>
    </>
  );
};

export default TransitionForm;
