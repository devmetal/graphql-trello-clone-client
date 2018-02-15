import React from 'react';
import styled from 'styled-components';

const CommentBox = styled.div`
  background-color: ${props => props.theme.colors.bg};
  border-top: 1px solid ${props => props.theme.colors.fg};
  border-bottom: 1px solid ${props => props.theme.colors.fg};
`;

export default ({ body }) => (
  <CommentBox>
    {body}
  </CommentBox>
);
