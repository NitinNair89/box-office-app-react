import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import apiGet from '../misc/config';

const Home = () => {
  // Hooks
  const [inputState, setInputState] = useState('');
  const [tvShowInfo, setTVShowInfo] = useState(null);

  /**
   * Function to handle onClick event of search button
   */
  const handleOnClick = () => {
    apiGet(`/search/shows?q=${inputState}`).then(result => {
      setTVShowInfo(result);
    });
  };

  /**
   * Function to handle onChange event of search box
   * @param {*} event
   */
  const handleOnChange = event => {
    setInputState(event.target.value);
  };

  /**
   * Function to handle onKeyDown event of search box
   * @param {*} event
   */
  const handleOnKeyDown = event => {
    if (event.keyCode === 13) {
      handleOnClick();
    }
  };

  /**
   * Function to display TV show's information
   */
  const renderTVShowInfo = () => {
    if (tvShowInfo && tvShowInfo.length === 0) {
      return <div>No results found!</div>;
    }

    if (tvShowInfo && tvShowInfo.length > 0) {
      return (
        <div>
          {tvShowInfo.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <MainPageLayout>
      <label>
        <input
          type="text"
          value={inputState}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          placeholder="Search something..."
          aria-placeholder="Enter something to search"
        />
      </label>
      <button type="button" onClick={handleOnClick}>
        Search
      </button>
      {renderTVShowInfo()}
    </MainPageLayout>
  );
};

export default Home;
