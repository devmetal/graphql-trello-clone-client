import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabelInput from './LabelInput';

class BoardTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      value: props.label,
    };
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  handleChange = e => this.setState({ value: e.target.value });

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.setState({ editing: false });
      this.props.onSave(this.state.value);
    }
  };

  startEdit = () => this.setState({ editing: true });

  setWrapperRef = node => (this.wrapperRef = node);

  setInputRef = node => (this.inputRef = node);

  handleClickOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.setState({ editing: false });
    }
  };

  render() {
    const { editing } = this.state;
    if (editing) {
      const { value } = this.state;
      return (
        <div ref={this.setWrapperRef}>
          <LabelInput
            autoFocus
            ref={this.setInputRef}
            type="text"
            value={value}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
      );
    }

    const { label } = this.props;
    return (
      <div onClick={this.startEdit}>
        <h4>{label}</h4>
      </div>
    );
  }
}

export default BoardTitle;
