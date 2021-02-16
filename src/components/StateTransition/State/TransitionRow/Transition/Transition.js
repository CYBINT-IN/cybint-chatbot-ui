import "./Transition.css";

const State = ({ isActive, index, label, onClick }) => {
  return (
    <div className={"transition " + (isActive ? "active" : "")}>
      <button onClick={onClick} className={isActive ? "dark btn" : "light btn"}>
        {label}
      </button>
    </div>
  );
};
export default State;
