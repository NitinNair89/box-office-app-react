import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import apiGet from '../misc/config';

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

const initialState = {
  show: null,
  isLoading: true,
  isError: null,
};

const ShowInfo = () => {
  // Hooks
  const { showID } = useParams();
  // Reducer
  const [{ show, isLoading, isError }, dispatch] = useReducer(
    fnReducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${showID}?embed[]=seasons&embed[]=cast`)
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
  }, [showID]);

  // Conditional rendering
  if (isLoading) {
    return <div>Loading TV show's information...</div>;
  }

  if (isError) {
    return (
      <div>
        Error occurred.
        <br />
        {isError}
      </div>
    );
  }

  return <div>This is show page</div>;
};

export default ShowInfo;
