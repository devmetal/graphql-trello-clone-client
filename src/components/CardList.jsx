import React from 'react';
import styled from 'styled-components';

const Items = styled.div`
  margin-top: 0.5rem;
  padding-top: 0.2rem;
  display: flex;
  flex-direction: column;
`;

export default ({ children }) => (
  <Items>
    {children}
  </Items>
);
