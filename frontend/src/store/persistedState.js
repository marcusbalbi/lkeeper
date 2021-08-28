const loadState = () => {
  try {
    const state = localStorage.getItem("lkeeper_state");

    if (!state) {
      return undefined;
    }

    return JSON.parse(state);
  } catch (err) {
    console.log(`Failed to load the state:`, err.message);
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("lkeeper_state", serializedState);

    return true;
  } catch (err) {
    console.log(`Failed to save the state:`, err.message);
  }
};

export { saveState, loadState };
