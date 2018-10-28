import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  min-height: 4rem;
  padding: 0.2em;
  margin-bottom: 0.2em;
  background-color: ${props => props.theme.colors.fg2};
  border-radius: ${props => props.theme.border.radius};
  position: relative;
  opacity: ${props => (props.loading ? 0.5 : 1)};
`;

const Title = styled.h4`
  margin: 0;
`;

const CursorMove = styled.div`
  cursor: move;
`;

const DragIcon = () => (
  <CursorMove>
    <i className="fas fa-bars" />
  </CursorMove>
);

const CardH = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 0.1rem;
  padding-right: 0.2rem;
  border-bottom: 1px solid ${props => props.theme.colors.fg};
`;

const CardB = styled.div`
  width: 100%;
  padding-left: 0.1rem;
  padding-right: 0.2rem;
  text-align: justify;
`;

export default class extends Card {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    children: PropTypes.node.isRequired,
    onDragStart: PropTypes.func,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    loading: false,
  };

  setDragIconRef = node => (this.dragRef = node);

  handleDragStart = e => {
    this.props.onDragStart(e);
  };

  render() {
    const { title, children, loading } = this.props;

    return (
      <Card
        draggable={this.props.onDragStart !== undefined}
        onDragStart={this.handleDragStart}
        loading={loading}
      >
        <CardH>
          {typeof title === 'string' ? <Title>{title}</Title> : title}
          <DragIcon />
        </CardH>
        <CardB>{children}</CardB>
      </Card>
    );
  }
}
