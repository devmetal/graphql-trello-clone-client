import React from 'react';
import { Flex, FlexItem } from './Flex';
import IconButton from './IconButton';

const Comments = ({ onClick }) => (
  <IconButton onClick={onClick} icon="fas fa-comments" />
);
const Edit = ({ onClick }) => (
  <IconButton onClick={onClick} icon="fas fa-edit" />
);
const Remove = ({ onClick }) => (
  <IconButton onClick={onClick} icon="fas fa-trash-alt" />
);

const TikcetBody = ({ body, onEdit, onRemove, onToggleComments }) => (
  <Flex justifyContent="space-between">
    <FlexItem flexBasis="90%">{body}</FlexItem>
    <Flex flexDirection="column" flexBasis="auto">
      <Comments onClick={onToggleComments} />
      <Edit onClick={onEdit} />
      <Remove onClick={onRemove} />
    </Flex>
  </Flex>
);

export default TikcetBody;
