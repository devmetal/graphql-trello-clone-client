import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import TicketBody from './TicketBody';
import HiddenByDefault from './HiddenByDefault';
import Comments from './Comments';
import Button from './Button';
import { Flex } from './Flex';
import TicketType from '../types/Ticket';

class TicketCard extends Component {
  state = { commentsVisible: false, confirmDelete: false };

  static propTypes = {
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    ticket: TicketType.isRequired,
  };

  handleToggleComments = () =>
    this.setState({ commentsVisible: !this.state.commentsVisible });
  
  handleRemove = () =>
    this.setState({ confirmDelete: true });

  handleCancel = () =>
    this.setState({ confirmDelete: false });

  render() {
    const { ticket, onEdit, onRemove, onDragStart } = this.props;
    const { id, label, body, comments } = ticket;
    
    return (
      <Card onDragStart={onDragStart} title={label} loading={id === ''}>
        <TicketBody
          body={body}
          onToggleComments={this.handleToggleComments}
          onEdit={onEdit}
          onRemove={this.handleRemove}
        />
        <HiddenByDefault visible={this.state.commentsVisible}>
          <Comments comments={comments} />
        </HiddenByDefault>
        <HiddenByDefault visible={this.state.confirmDelete}>
          Are you sure?
          <Flex>
            <Button onClick={onRemove}>Delete</Button>
            <Button onClick={this.handleCancel}>Cancel</Button>
          </Flex>
        </HiddenByDefault>
      </Card>
    )
  }
}

export default TicketCard;
