import React, { useState, useCallback } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import apiGet from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

/**
 * Function to display TV show's information
 */
const renderTVShowInfo = results => {
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

const Home = () => {
  // Hooks
  const [inputState, setInputState] = useLastQuery();
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
  const handleOnChange = useCallback(
    event => {
      setInputState(event.target.value);
    },
    [setInputState]
  );

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
   * Function to set search type in state
   */
  const handleOnChangeSearch = useCallback(event => {
    setSearchType(event.target.value);
  }, []);

  return (
    <MainPageLayout>
      <label>
        <SearchInput
          type="text"
          value={inputState}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          placeholder="Search something..."
          aria-placeholder="Enter something to search"
        />
      </label>

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            name="search-type"
            value="shows"
            checked={searchType === 'shows'}
            onChange={handleOnChangeSearch}
          />
        </div>
        <div>
          <CustomRadio
            label="Actor"
            name="search-type"
            value="people"
            checked={searchType === 'people'}
            onChange={handleOnChangeSearch}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={handleOnClick}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderTVShowInfo(results)}
    </MainPageLayout>
  );
};

export default Home;
