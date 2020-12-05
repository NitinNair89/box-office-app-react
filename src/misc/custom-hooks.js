import { useEffect, useReducer } from 'react';

// reducer function
const showsReducer = (prevState, action) => {
  switch (action.type) {
    case 'ADD':
      return [...prevState, action.showID];

    case 'REMOVE':
      return prevState.filter(showID => showID !== action.showID);

    default:
      return prevState;
  }
};

// Custom reducer function
function useCustomReducer(reducer, initialState, key) {
  // useReducer hook to get data from local storage
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  // useEffect hook to set data in local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  useCustomReducer(showsReducer, [], key);
}
