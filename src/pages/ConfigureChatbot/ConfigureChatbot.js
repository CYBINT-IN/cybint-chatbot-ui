import { useState } from "react";
import GeneralQuestions from "../../components/GeneralQuestions/GeneralQuestions";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import StateTransition from "../../components/StateTransition/StateTransition";
import useStepState from "../../hooks/useStepState";
import "./ConfigureChatbot.css";
// const steps = [
//   "States/Transitions",
//   "General Questions",
//   "Special Cases",
//   "Adding Variables",
//   "Confirmation",
// ];

const ConfigureChatbot = () => {
  const [currentStepNo, setCurrentStepNo] = useStepState(1, 5, 1);

  return (
    <div className="config-chatbot-container">
      <ProgressBar completed={currentStepNo} total={5} />

      <div className="step-container">
        {currentStepNo == 1 ? <StateTransition /> : null}
        {currentStepNo == 2 ? <GeneralQuestions /> : null}
      </div>

      <div className='step-button-group'>
        {currentStepNo > 1 ? (
          <button
            className="light btn right-margin"
            onClick={() => setCurrentStepNo(currentStepNo - 1)}
          >
            Back
          </button>
        ) : (null)}
        {currentStepNo < 5 ? (
          <button
            className="dark btn"
            onClick={() => setCurrentStepNo(currentStepNo + 1)}
          >
            Proceed
          </button>
        ) : (null)}
      </div>
    </div>
  );
};

export default ConfigureChatbot;
