import React from 'react';
import styled from 'styled-components';
import { Grid, Row } from 'react-styled-flexboxgrid';

const StyledGrid = styled(Grid) `
  background-color: ${props => props.theme.colors.bg};
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  height: 100%;
`;

const StyledRow = styled(Row)`
`;

export default ({ children }) => (
  <StyledGrid fluid={true}>
    <StyledRow>
      {children}
    </StyledRow>
  </StyledGrid>
);
