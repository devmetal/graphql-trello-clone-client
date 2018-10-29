import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TicketEditor from './TicketEditor';
import TicketCard from './TicketCard';
import TicketType from '../types/Ticket';

class EditableTicket extends Component {
  state = { editing: false };

  static propTypes = {
    ticket: TicketType.isRequired,
    onSave: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  static defaultProps = {
    ticket: {
      id: '',
      label: '',
      body: '',
      comments: [],
    },
  };

  handleEdit = () => this.setState({ editing: true });

  handleCancel = () => this.setState({ editing: false });

  handleSave = ticket => {
    this.props.onSave(ticket);
    this.setState({ editing: false });
  };

  handleRemove = () => {
    const { ticket } = this.props;
    this.props.onRemove(ticket);
  };

  render() {
    const { editing } = this.state;
    const { onDragStart } = this.props;

    if (editing) {
      return (
        <TicketEditor
          onSave={this.handleSave}
          onCancel={this.handleCancel}
          ticket={this.props.ticket}
        />
      );
    }

    return (
      <TicketCard
        onEdit={this.handleEdit}
        onRemove={this.handleRemove}
        onDragStart={onDragStart}
        ticket={this.props.ticket}
      />
    );
  }
}

export default EditableTicket;
