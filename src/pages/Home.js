import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

const Home = () => {
  // Hooks
  const [inputState, setInputState] = useState('');

  // Function to handle onClick event of search button
  // https://api.tvmaze.com/search/shows?q=
  const handleOnClick = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${inputState}`)
      // convert response to JSON
      .then(response => response.json())
      // use converted JSON response
      .then(result => {
        console.log(result);
      });
  };

  // Function to handle onChange event of search box
  const handleOnChange = event => {
    setInputState(event.target.value);
  };

  // Function to handle onKeyDown event of search box
  const handleOnKeyDown = event => {
    if (event.keyCode === 13) {
      handleOnClick();
    }
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
    </MainPageLayout>
  );
};

export default Home;
