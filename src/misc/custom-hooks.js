import { useReducer, useEffect, useState } from 'react';
import apiGet from '../misc/config';

function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }

    case 'REMOVE': {
      return prevState.filter(showId => showId !== action.showId);
    }

    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = 'lastQuery') {
  const [inputState, setInputState] = useState(() => {
    const persisted = sessionStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : '';
  });

  const setPersistedInput = newInputState => {
    setInputState(newInputState);
    sessionStorage.setItem(key, JSON.stringify(newInputState));
  };

  return [inputState, setPersistedInput];
}

// Reducer function
const fnReducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return {
        show: action.show,
        isLoading: false,
        isError: false,
      };
    }

    case 'FETCH_FAILED': {
      return {
        ...prevState,
        isLoading: false,
        isError: action.error,
      };
    }

    default:
      return prevState;
  }
};

export function useShow(showId) {
  // Reducer
  const [state, dispatch] = useReducer(fnReducer, {
    show: null,
    isLoading: true,
    isError: null,
  });

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({
            type: 'FETCH_SUCCESS',
            show: results,
          });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({
            type: 'FETCH_FAILED',
            error: err.message,
          });
        }
      });

    // Clean-up callback function
    return () => {
      isMounted = false;
    };
  }, [showId]);

  return state;
}
