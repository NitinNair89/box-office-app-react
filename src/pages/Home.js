import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import apiGet from '../misc/config';

const Home = () => {
  // Hooks
  const [inputState, setInputState] = useState('');
  const [results, setResults] = useState(null);
  const [searchType, setSearchType] = useState('shows');

  /**
   * Function to handle onClick event of search button
   */
  const handleOnClick = () => {
    apiGet(`/search/${searchType}?q=${inputState}`).then(result => {
      setResults(result);
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
    if (results && results.length === 0) {
      return <div>No results found!</div>;
    }

    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }

    return null;
  };

  /**
   * Function to set search type in state
   */
  const handleOnChangeSearch = event => {
    setSearchType(event.target.value);
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
      <div>
        <label>
          <input
            type="radio"
            name="search-type"
            value="shows"
            checked={searchType === 'shows'}
            onChange={handleOnChangeSearch}
          />
          Shows
        </label>
        <label>
          <input
            type="radio"
            name="search-type"
            value="people"
            checked={searchType === 'people'}
            onChange={handleOnChangeSearch}
          />
          Actor
        </label>
      </div>
      {renderTVShowInfo()}
    </MainPageLayout>
  );
};

export default Home;
