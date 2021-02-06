import { useState } from "react";
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
        {/* {currentStepNo == 2 ? <StateTransition /> : null} */}
      </div>
      <button className="dark-btn">Proceed</button>
    </div>
  );
};

export default ConfigureChatbot;
