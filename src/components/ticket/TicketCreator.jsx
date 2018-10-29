import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TicketEditor from './TicketEditor';
import Button from './Button';

class TicketCreator extends Component {
  state = { editing: false };

  static propTypes = {
    onCreate: PropTypes.func.isRequired,
  };

  startEdit = () => this.setState({ editing: true });

  stopEdit = () => this.setState({ editing: false });

  handleCreate = ticket => {
    this.setState({ editing: false });
    this.props.onCreate(ticket);
  };

  render() {
    const { editing } = this.state;

    if (!editing) {
      return (
        <Button fullWidth onClick={this.startEdit}>
          Create
        </Button>
      );
    }

    return (
      <TicketEditor onCreate={this.handleCreate} onCancel={this.stopEdit} />
    );
  }
}

export default TicketCreator;
