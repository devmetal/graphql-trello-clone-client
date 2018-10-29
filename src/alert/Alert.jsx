import React from 'react';
import styled from 'styled-components';

import Portal from '../components/Portal';

const AlertBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Alert = ({ text, className }) => (
  <Portal>
    <AlertBox>
      <div className={className}>{text}</div>
    </AlertBox>
  </Portal>
);

export const Success = styled(Alert)`
  background-color: green;
`;

export const Fail = styled(Alert)`
  background-color: red;
`;
