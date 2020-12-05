import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import apiGet from '../misc/config';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

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

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        genres={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premierred={show.premierred}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default ShowInfo;
