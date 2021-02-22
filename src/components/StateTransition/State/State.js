import { ToastsStore } from "react-toasts";
import { useStateTrans } from "../../../contexts/stateTransitionContext";
import "./State.css";
import TransitionRow from "./TransitionRow/TransitionRow";

const State = ({ isActive, state, label, onClick }) => {
  const { deleteState } = useStateTrans();
  return (
    <div className={"state " + (isActive ? "active" : "")}>
      <div className="button-container">
        <button onClick={onClick} className="dark btn">
          {label}
        </button>
        <button
          onClick={async () => {
            await deleteState(state._id);
            ToastsStore.error("Deleted State Successfully");
          }}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
      <div className="body">
        <TransitionRow state={state} />
      </div>
    </div>
  );
};
export default State;
