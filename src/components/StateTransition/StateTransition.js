import State from "./State/State";
import "./StateTransition.css";
import useSingleOpenByIds from "../../hooks/useSingleOpenByIds";
import genereateDummyID from "../../utils/generateDummyID";
import { useStateTrans } from "../../contexts/stateTransitionContext";
import { useState } from "react";

const StateTransition = () => {
  const { stateTransData, addState } = useStateTrans();
  const [currentlyOpen, setCurrentlyOpen] = useState();

  const handleStateClick = (_id) => {
    // If open then close
    if (currentlyOpen === _id) {
      setCurrentlyOpen(null);
      // if not open then open
    } else {
      setCurrentlyOpen(_id);
    }
  };

  // const addDummyState = () => {
  //   const newId = genereateDummyID();
  //   setStateIds([...stateIds, newId]);
  // };
  return (
    <>
      <div className="states-header">
        <h1>States/Transition</h1>
        <button className="dark btn" onClick={addState}>
          Add State
        </button>
      </div>
      <div className="states-body">
        {stateTransData.map((state, key) => {
          return (
            <State
              label={`State ${key + 1}`}
              key={key}
              state={state}
              isActive={state._id === currentlyOpen}
              onClick={() => handleStateClick(state._id)}
            />
          );
        })}
      </div>
    </>
  );
};

export default StateTransition;
