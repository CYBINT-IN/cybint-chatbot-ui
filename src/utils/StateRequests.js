const stateURL = `${process.env.REACT_APP_ROOT_URL}/states`;

// Function to fetch state data by id
export const fetchById = async (id) => {
  try {
    const res = await fetch(`${stateURL}/read?id=${id}`);
    const data = await res.json();
    if (!data.error && res.ok) {
      return data.state;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (transitions = []) => {
  try {
    const res = await fetch(`${stateURL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: {
          transitions,
        },
      }),
    });
    const data = await res.json();
    if (!data.error && res.ok) {
      const result = await fetchById(data.insertId);
      console.log(result);
      if (result) {
        return result;
      }
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};
export default {
  fetchById,
  create,
};
