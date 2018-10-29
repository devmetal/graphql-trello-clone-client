import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-styled-flexboxgrid';

const StyledCol = styled(Col)`
  background-color: ${props => props.theme.colors.fg};
  border: 1px solid ${props => props.theme.colors.btn};
  border-radius: ${props => props.theme.border.radius};
  color: ${props => props.theme.colors.txt};
  padding-bottom: 0.5em;
`;

export default ({ children, onDrop, onDragOver }) => (
  <StyledCol onDrop={onDrop} onDragOver={onDragOver} md={3}>
    {children}
  </StyledCol>
);
