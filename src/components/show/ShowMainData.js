import React from 'react';
import IMG_PLACEHOLDER from '../../images/not-found.png';
import { Star } from '../styled';
import { MainDataWrapper, Headline, TagList } from './ShowMainData.styled';

const ShowMainData = ({ name, rating, summary, genres, image }) => {
  return (
    <MainDataWrapper>
      <img src={image ? image.original : IMG_PLACEHOLDER} alt="show-cover" />
      <div className="text-side">
        <Headline>
          <h1>{name}</h1>
          <div>
            <Star active={true} />
            <span>{rating.average || 'N/A'}</span>
          </div>
        </Headline>
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        />

        <TagList>
          {genres.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </TagList>
      </div>
    </MainDataWrapper>
  );
};
export default ShowMainData;
