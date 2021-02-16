import "./State.css";
import TransitionRow from "./TransitionRow/TransitionRow";

const State = ({ isActive, state, label, onClick }) => {
  return (
    <div className={"state " + (isActive ? "active" : "")}>
      <button onClick={onClick} className="dark btn">
        {label}
      </button>
      <div className="body">
        <TransitionRow state={state} />
      </div>
    </div>
  );
};
export default State;
