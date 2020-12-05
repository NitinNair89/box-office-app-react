import React from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { useShow } from '../misc/custom-hooks';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const ShowInfo = () => {
  // Hooks
  const { showID } = useParams();

  const { show, isLoading, isError } = useShow(showID);

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
