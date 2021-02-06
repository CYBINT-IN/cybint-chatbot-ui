import "./State.css";
import TransitionRow from "./TransitionRow/TransitionRow";

const State = ({ isActive, _id, label, onClick }) => {
  return (
    <div className={"state " + (isActive ? "active" : "")}>
      <button onClick={onClick} className="dark-btn">
        {label}
      </button>
      <div className="body">
        <TransitionRow stateId={_id} />
      </div>
    </div>
  );
};
export default State;
