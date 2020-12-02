import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiGet from '../misc/config';

const ShowInfo = () => {
  // Hooks
  const { showID } = useParams();
  const [showData, setShowData] = useState(null);

  useEffect(() => {
    apiGet(`/shows/${showID}?embed[]=seasons&embed[]=cast`).then(results => {
      setShowData(results);
    });
  }, [showID]);

  return <div>This is show page</div>;
};

export default ShowInfo;
