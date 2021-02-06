import "./TransitionRow.css";
import Transition from "./Transition/Transition";
import useSingleOpenByIds from "../../../../hooks/useSingleOpenByIds";
import TransitionForm from "./TransitionForm/TransitionForm";
import genereateDummyID from "../../../../utils/generateDummyID";

const dummyTransitions = [
  "c822cbf5-0017-4f51-9545-bd7600e179c9",
  "4d8211e9-daaf-497c-a2e5-4c49e03e8825",
];


const TransitionRow = ({stateId}) => {
  const [
    transitionIds,
    setTransitionIds,
    currentlyOpen,
    handleTransitionClick,
  ] = useSingleOpenByIds(
    dummyTransitions,
    "c822cbf5-0017-4f51-9545-bd7600e179c9"
  );
    const addDummyTransition = () => {
        const newId = genereateDummyID()
        setTransitionIds([...transitionIds, newId])
    }
  return (
    <>
      <div className="transitions-header">
        {transitionIds.map((transition_id, key) => {
          return (
            <Transition
              label={`Transition ${key + 1}`}
              key={key}
              _id={transition_id}
              isActive={transition_id === currentlyOpen}
              onClick={() => handleTransitionClick(transition_id)}
            />
          );
        })}
        <button className="dark-btn" onClick={addDummyTransition}>Add Transition</button>
      </div>
      <div className={"transitions-body " + (currentlyOpen ? "active": "")}>
        {currentlyOpen ? <TransitionForm stateId={stateId} transitionId={currentlyOpen} /> : null}
    </div>
    </>
  );
};

export default TransitionRow;
