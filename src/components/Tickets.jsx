import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TicketType from '../types/Ticket';
import EditableTicket from './EditableTicket';

class Tickets extends Component {
  static propTypes = {
    tickets: PropTypes.arrayOf(TicketType),
    onSave: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  static defaultProps = {
    tickets: [],
  };

  render() {
    const { tickets, onSave, onRemove, onDragStart } = this.props;
    return (
      <div>
        {tickets.map(ticket => (
          <EditableTicket
            onDragStart={e => onDragStart(e, ticket)}
            key={ticket.id}
            onRemove={onRemove}
            onSave={onSave}
            ticket={ticket}
          />
        ))}
      </div>
    );
  }
}

export default Tickets;
