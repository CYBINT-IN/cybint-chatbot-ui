import "./App.css";
import ConfigureChatbot from "./pages/ConfigureChatbot/ConfigureChatbot";
import roboImg from "./assets/robo.png";
import { StateTransProvider } from "./contexts/stateTransitionContext";

function App() {
  return (
    <StateTransProvider>
      <div className="App">
        <ConfigureChatbot />
        <img className="robo" src={roboImg} alt="robo" />
      </div>
    </StateTransProvider>
  );
}

export default App;
