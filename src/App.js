import "./App.css";
import ConfigureChatbot from "./pages/ConfigureChatbot/ConfigureChatbot";
import roboImg from "./assets/robo.png";

function App() {
  return (
    <div className="App">
      <ConfigureChatbot />
      <img className="robo" src={roboImg} alt="robo" />
    </div>
  );
}

export default App;
