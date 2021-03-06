import React, { memo } from 'react';
import RadioWrapper from './CustomRadio.styled';

const CustomRadio = ({ label, ...restProps }) => {
  return (
    <RadioWrapper>
      <input {...restProps} type="radio" />
      <span />
      {label}
    </RadioWrapper>
  );
};

export default memo(CustomRadio);
