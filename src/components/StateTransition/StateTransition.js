import State from "./State/State";
import "./StateTransition.css";
import useSingleOpenByIds from "../../hooks/useSingleOpenByIds";
import genereateDummyID from "../../utils/generateDummyID";

const dummyStates = [
  "c822cbf5-0017-4f51-9545-bd7600e179c9",
  "4d8211e9-daaf-497c-a2e5-4c49e03e8825",
];
const StateTransition = () => {
  const [
    stateIds,
    setStateIds,
    currentlyOpen,
    handleStateClick,
  ] = useSingleOpenByIds(dummyStates, "c822cbf5-0017-4f51-9545-bd7600e179c9");
  const addDummyState = () => {
    const newId = genereateDummyID();
    setStateIds([...stateIds, newId]);
  };
  return (
    <>
      <div className="states-header">
        <h1>States/Transition</h1>
        <button className="dark btn" onClick={addDummyState}>
          Add State
        </button>
      </div>
      <div className="states-body">
        {stateIds.map((stateId, key) => {
          return (
            <State
              label={`State ${key + 1}`}
              key={key}
              _id={stateId}
              isActive={stateId === currentlyOpen}
              onClick={() => handleStateClick(stateId)}
            />
          );
        })}
      </div>
    </>
  );
};

export default StateTransition;
