import "./TransitionRow.css";
import { useState } from "react";
import Transition from "./Transition/Transition";
import useSingleOpenByIds from "../../../../hooks/useSingleOpenByIds";
import TransitionForm from "./TransitionForm/TransitionForm";
import genereateDummyID from "../../../../utils/generateDummyID";
import { useStateTrans } from "../../../../contexts/stateTransitionContext";

const TransitionRow = ({ state }) => {
  const { addTransInState } = useStateTrans();
  const [currentlyOpen, setCurrentlyOpen] = useState();

  const handleTransitionClick = (key) => {
    // If open then close
    // console.log("current ", currentlyOpen);
    // console.log("key ", key);

    if (currentlyOpen === key) {
      setCurrentlyOpen(undefined);
      // if not open then open
    } else {
      setCurrentlyOpen(key);
    }
  };
  // const addDummyTransition = () => {
  //   const newId = genereateDummyID();
  //   setTransitionIds([...transitionIds, newId]);
  // };
  return (
    <>
      <div className="transitions-header">
        {state.transitions.map((transition, key) => {
          return (
            <Transition
              label={`Transition ${key + 1}`}
              key={key}
              index={key}
              transition={transition}
              isActive={key === currentlyOpen}
              onClick={() => handleTransitionClick(key)}
            />
          );
        })}
        <button className="dark btn" onClick={() => addTransInState(state._id)}>
          Add Transition
        </button>
      </div>
      <div
        className={
          "transitions-body " +
          (typeof currentlyOpen !== "undefined" ? "active" : "")
        }
      >
        {typeof currentlyOpen !== "undefined" ? (
          <TransitionForm
            state={state}
            closeFunc={() => handleTransitionClick(currentlyOpen)}
            transitionIndex={currentlyOpen}
          />
        ) : null}
      </div>
    </>
  );
};

export default TransitionRow;
