import { useState } from "react";
import GeneralQuestions from "../../components/GeneralQuestions/GeneralQuestions";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import StateTransition from "../../components/StateTransition/StateTransition";
import "./ConfigureChatbot.css";
// const steps = [
//   "States/Transitions",
//   "General Questions",
//   "Special Cases",
//   "Adding Variables",
//   "Confirmation",
// ];

const ConfigureChatbot = () => {
  const [currentStepNo, setCurrentStepNo] = useState(1);

  return (
    <div className="config-chatbot-container">
      <ProgressBar completed={currentStepNo} total={5} />

      <div className="step-container">
        {currentStepNo == 1 ? <StateTransition /> : null}
        {currentStepNo == 2 ? <GeneralQuestions /> : null}
      </div>
      <button
        className="dark btn"
        onClick={() => setCurrentStepNo((curr) => curr + 1)}
      >
        Proceed
      </button>
    </div>
  );
};

export default ConfigureChatbot;
