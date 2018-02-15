import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardCol from './BoardCol';
import BoardTitle from './BoardTitle';
import Tickets from './Tickets';
import TicketCreator from './TicketCreator';
import TicketType from '../types/Ticket';

class Board extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tickets: PropTypes.arrayOf(TicketType),
    onSaveBoard: PropTypes.func.isRequired,
    onSaveTicket: PropTypes.func.isRequired,
    onRemoveTicket: PropTypes.func.isRequired,
    onMoveTicket: PropTypes.func.isRequired,
  };

  static defaultProps = {
    tickets: [],
  };

  handleSaveTitle = label =>
    this.props.onSaveBoard({
      id: this.props.id,
      label,
    });

  handleSaveTicket = ticket =>
    this.props.onSaveTicket(ticket);

  handleCreateTicket = ticket =>
    this.props.onCreateTicket(ticket);

  handleRemoveTicket = ticket =>
    this.props.onRemoveTicket(ticket);

  handleDrop = (e) => {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    this.props.onMoveTicket(data.ticket);
  }

  handleDragOver = (e) => {
    e.preventDefault();
  }

  handleDragStart = (e, ticket) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({ ticket }),
    );
  }

  render() {
    const { label, tickets } = this.props;
    return (
      <BoardCol onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
        <BoardTitle label={label} onSave={this.handleSaveTitle} />
        <Tickets
          onDragStart={this.handleDragStart}
          onSave={this.handleSaveTicket}
          onRemove={this.handleRemoveTicket}
          tickets={tickets}
        />
        <TicketCreator onCreate={this.handleCreateTicket} />
      </BoardCol>
    );
  }
}

export default Board;
