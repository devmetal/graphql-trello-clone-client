import React from 'react';
import styled from 'styled-components';

const Pointer = styled.div`
  cursor: pointer;
`;

export default ({ icon, onClick }) => (
  <Pointer onClick={onClick}>
    <i className={icon} />
  </Pointer>
);
