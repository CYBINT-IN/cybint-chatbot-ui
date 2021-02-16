const transURL = `${process.env.REACT_APP_ROOT_URL}/transitions`;
const emptyTrans = {
  statement: "",
  keywords: [],
  end: "",
  spareContent: "",
  intent: "",
  state: "",
  type: "",
};

export const create = async (state_id, transition) => {
  try {
    console.log("Attempting To Create", transition);
    if (state_id) {
      const res = await fetch(`${transURL}/create?id=${state_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transition: transition,
        }),
      });
      const data = await res.json();
      if (!data.error && res.ok) {
        return data;
      }
      console.log(data);
      return null;
    } else {
      throw Error("State ID required");
    }
  } catch (error) {
    console.log(error);
  }
};

export const update = async (trans_id, state) => {
  try {
    if (trans_id && state) {
      const res = await fetch(`${transURL}/update?id=${trans_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state }),
      });
      const data = await res.json();
      if (!data.error && res.ok) {
        return data;
      }
      console.log(data);
      return null;
    } else {
      throw Error("Transition ID and Transition required");
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  // fetchById,
  create,
  update,
};
