import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './Card';
import Button from './Button';
import TicketLabelInput from './LabelInput';
import TicketType from '../types/Ticket';

const TicketBodyInput = styled.textarea`
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-height: 6rem;
  border: 1px solid ${props => props.theme.colors.fg};
  margin-top: 0.3rem;
  background: none;
  outline: none;
`;

class TicketEditor extends Component {
  static propTypes = {
    ticket: PropTypes.shape(TicketType),
  };

  static defaultProps = {
    ticket: {
      label: '',
      body: '',
      id: '',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      label: props.ticket.label,
      body: props.ticket.body,
    };
  }

  handleLabelChange = e =>
    this.setState({ label: e.target.value });

  handleBodyChange = e =>
    this.setState({ body: e.target.value });
  
  handleSave = (e) => {
    if (this.props.ticket.id !== '') {
      this.props.onSave({
        ...this.state,
        id: this.props.ticket.id,
      });
    } else {
      this.props.onCreate({
        ...this.state
      });
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {      
      e.preventDefault();
      this.props.onSave({...this.state});
    }
  }

  render() {
    const { onCancel } = this.props;

    return (
      <Card
        title={
          <TicketLabelInput
            type="text"
            value={this.state.label}
            onChange={this.handleLabelChange}
            onKeyPress={this.handleKeyPress}
          />
        }
      >
        <TicketBodyInput
          value={this.state.body}
          onChange={this.handleBodyChange}
        />
        <Button fullWidth onClick={this.handleSave}>Save</Button>
        <Button fullWidth onClick={onCancel}>Cancel</Button>
      </Card>
    )
  }
}

export default TicketEditor;
