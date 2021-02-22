import { useContext, useEffect, useState, createContext } from "react";
import getKeywords from "../utils/getKeywords";
import StateRequests from "../utils/StateRequests";
import TransitionRequests from "../utils/TransitionRequests";

const StateTransContext = createContext();

export function useStateTrans() {
  return useContext(StateTransContext);
}
const emptyTransition = {
  statement: "",
  keywords: [],
  end: false,
  spareContent: "",
  intent: "",
  state: "",
  type: "",
};

export function StateTransProvider({ children }) {
  const [rootStateId, setRootStateId] = useState("602b6749f6d42f1f4cc61533"); // the state at the root of the graph
  const [stateTransData, setStateTransData] = useState([]); // the whole data
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState({});

  // Function to get index + of the state by ID
  // Returns -1 if not found
  function getStateNum(id) {
    const i = stateTransData.findIndex((st) => st._id === id);
    return i >= 0 ? i + 1 : i;
  }
  function getStateById(id) {
    const i = getStateNum(id) - 1;
    if (i >= 0) {
      return stateTransData[i];
    }
  }
  // Function to replace a transition in a state by STATE ID and TRANS Object if trans id found else return false
  const updateTransInState = async (state_id, trans, transIndex) => {
    if (stateTransData) {
      const stateIndex = getStateNum(state_id) - 1;
      if (stateIndex < 0) {
        console.log(`State ${state_id} Not Found`);
        return { success: false };
      }
      // shalow copy all props of state
      let newState = { ...stateTransData[stateIndex] };
      // copy each of thre transitions into the new state
      if (!newState.transitions) {
        return { success: false };
      }
      newState.transitions = newState.transitions.map((t) => ({ ...t }));
      // check if it's not found
      if (transIndex < 0 || transIndex > newState.transitions.length) {
        return { success: false, stateIndex };
      }

      // replace the old trans with new trans
      newState.transitions[transIndex] = trans;

      // repalce the newly modified state
      const newStateTransData = [...stateTransData];
      newStateTransData[stateIndex] = newState;
      // update in backend
      const data = await TransitionRequests.update(newState);
      if (data) {
        setStateTransData(newStateTransData);
        return { success: true, stateIndex, transIndex };
      }
      return { success: false };
    }
  };
  // Function to replace a transition in a state by STATE ID and TRANS Object if trans id found else return false
  const deleteTransInState = async (state_id, transIndex) => {
    if (stateTransData) {
      const stateIndex = getStateNum(state_id) - 1;
      if (stateIndex < 0) {
        console.log(`State ${state_id} Not Found`);
        return { success: false };
      }
      // shalow copy all props of state
      let newState = { ...stateTransData[stateIndex] };
      // copy each of thre transitions into the new state
      if (!newState.transitions) {
        return { success: false };
      }
      newState.transitions = newState.transitions.map((t) => ({ ...t }));
      // check if it's not found
      if (transIndex < 0 || transIndex > newState.transitions.length) {
        return { success: false, stateIndex };
      }
      newState.transitions.splice(transIndex, 1);
      // repalce the newly modified state
      const newStateTransData = [...stateTransData];
      newStateTransData[stateIndex] = newState;
      // update in backend
      const data = await TransitionRequests.remove(newState);
      if (data) {
        setStateTransData(newStateTransData);
        return { success: true, stateIndex, transIndex };
      }
      return { success: false };
    }
  };

  //Function to append a new transition to a state if it doesn't already exist
  const addTransInState = async (state_id, t = emptyTransition) => {
    const stateIndex = getStateNum(state_id) - 1;
    if (stateIndex >= 0) {
      const newState = { ...stateTransData[stateIndex] };
      if (!newState.transitions) {
        console.error("Transitions Missing");
        return;
      }
      const result = await TransitionRequests.create(state_id, t);
      if (result) {
        // find index of the required trans
        // if not found, push
        newState.transitions.push(t);
        // shalow copy current data
        const newStateTransData = [...stateTransData];
        // replace the state
        newStateTransData[stateIndex] = newState;
        setStateTransData(newStateTransData);
      }
    }
  };

  // function to add a state
  const addState = async () => {
    const state = await StateRequests.create();
    if (state) {
      console.log(stateTransData);
      const newStateTransData = [...stateTransData];
      console.log(newStateTransData);
      newStateTransData.push(state);
      console.log(newStateTransData);
      setStateTransData(newStateTransData);
    }
  };

  const deleteState = async (state_id) => {
    const data = await StateRequests.remove(state_id);
    if (data) {
      const newStateTransData = stateTransData.filter(
        (s) => s._id !== state_id
      );
      setStateTransData(newStateTransData);
    }
  };
  // Function to traverse the graph over the network
  const traverseCurrGraph = async () => {
    console.log(
      `traversing the graph, host: ${process.env.REACT_APP_ROOT_URL}`
    );
    setIsLoading(true);
    const temp = [];
    if (rootStateId) {
      const currState = await StateRequests.fetchById(rootStateId);
      if (currState) {
        temp.push(currState);
      }
      // loop through the array
      for (let s of temp) {
        // for each "State" Object
        // map it's transitions array  from array of ids to objects
        // console.log(temp, i);
        for (let j = 0; j < s.transitions.length; j++) {
          const transData = s.transitions[j];
          // try to find state with id same as transData.state
          // if not found, get and push inside the array
          if (
            !transData.end &&
            transData.state &&
            transData.state.length > 0 &&
            temp.findIndex((s) => s._id === transData.state) === -1
          ) {
            const stateData = await StateRequests.fetchById(transData.state);
            temp.push(stateData);
            console.log(temp);
          }
        }
      }

      setStateTransData(temp);
    }
    setIsLoading(false);
    console.log("traversal complete");
  };
  // Function to trigger retreversal of the graph
  const triggerSTRefresh = () => {
    setRefresh({ r: Math.random() });
  };

  // useEffect to call the graph traversal function on "rootState" change
  useEffect(() => {
    traverseCurrGraph();
  }, [rootStateId, refresh]);
  const val = {
    stateTransData,
    isLoading,
    getStateNum,
    updateTransInState,
    addTransInState,
    traverseCurrGraph,
    triggerSTRefresh,
    addState,
    getStateById,
    deleteTransInState,
    deleteState,
  };
  return (
    <StateTransContext.Provider value={val}>
      {children}
    </StateTransContext.Provider>
  );
}
