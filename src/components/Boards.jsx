import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row } from 'react-styled-flexboxgrid';
import styled from 'styled-components';
import Board from './Board';
import BoardType from '../types/Board';

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
  padding: 0;
`;

const StyledRow = styled(Row)`
  flex-wrap: nowrap;
`

class Boards extends Component {
  static propTypes = {
    boards: PropTypes.arrayOf(BoardType),
    onSaveBoard: PropTypes.func.isRequired,
    onSaveTicket: PropTypes.func.isRequired,
    onCreateTicket: PropTypes.func.isRequired,
    onRemoveTicket: PropTypes.func.isRequired,
    onMoveTicket: PropTypes.func.isRequired,
  };

  static defaultProps = {
    boards: [],
  };

  render() {
    const { boards, onRemoveTicket, onSaveBoard, onSaveTicket, onCreateTicket, onMoveTicket } = this.props;

    return (
      <StyledGrid fluid>
        <StyledRow>
          {boards.map(board =>
            <Board
              onSaveBoard={onSaveBoard}
              onCreateTicket={ticket => onCreateTicket(board.id, ticket)}
              onSaveTicket={ticket => onSaveTicket(board.id, ticket)}
              onRemoveTicket={ticket => onRemoveTicket(board.id, ticket)}
              onMoveTicket={ticket => onMoveTicket(board.id, ticket)}
              key={board.id}
              {...board}
            />
          )}
        </StyledRow>
      </StyledGrid>
    )
  }
}

export default Boards;
