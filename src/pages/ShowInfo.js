import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiGet from '../misc/config';

const ShowInfo = () => {
  // Hooks
  const { showID } = useParams();
  const [showData, setShowData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${showID}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          setShowData(results);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setIsLoading(false);
          setError(isError.message);
        }
      });

    // Clean-up callback function
    return () => {
      isMounted = false;
    };
  }, [showID, isError]);

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
