import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import BoardType from './types/Board';
import Boards from './components/Boards';
import query from './query/boards';
import updateBoard from './mutation/updateBoard';
import updateTicket from './mutation/updateTicket';
import createTicket from './mutation/createTicket';
import removeTicket from './mutation/removeTicket';
import moveTicket from './mutation/moveTicket';
import ticketAdded from './subscription/ticketAdded';
import ticketRemoved from './subscription/ticketRemoved';
import ticketUpdated from './subscription/ticketUpdated';
import boardUpdated from './subscription/boardUpdated';
import * as store from './store';

class BoardsContainer extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      boards: PropTypes.arrayOf(BoardType),
    }),
  };

  subscriptions = [];

  componentDidMount = () => {
    this.subscriptions.push(this.props.subsTicketAdded());
    this.subscriptions.push(this.props.subsTicketUpdated());
    this.subscriptions.push(this.props.subsTicketRemoved());
    this.subscriptions.push(this.props.subsBoardUpdated());
  };

  componentWillUnmount = () => this.subscriptions.map(s => s());

  handleSaveBoard = ({ id, label }) => {
    this.props.updateBoard({
      variables: { id, label },
      optimisticResponse: {
        __typename: 'Mutation',
        updateBoard: {
          __typename: 'Board',
          id,
          label,
        },
      },
    });
  };

  handleSaveTicket = (boardId, ticket) => {
    const { id, label, body } = ticket;
    this.props.updateTicket({
      variables: {
        id,
        ticket: {
          boardId,
          label,
          body,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateTicket: {
          __typename: 'Ticket',
          id,
          label,
          body,
        },
      },
    });
  };

  handleCreateTicket = (boardId, ticket) => {
    const { label, body } = ticket;
    this.props.createTicket({
      variables: {
        ticket: {
          boardId,
          label,
          body,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createTicket: {
          __typename: 'Ticket',
          id: '-1',
          label,
          body,
          comments: [],
          board: {
            __typename: 'Board',
            id: boardId,
          },
        },
      },
      update: (proxy, { data }) => {
        const prev = proxy.readQuery({ query });
        const next = store.addTicketToBoard(prev, {
          ticket: data.createTicket,
        });
        proxy.writeQuery({ query, data: next });
      },
    });
  };

  handleRemoveTicket = (boardId, ticket) => {
    const { id } = ticket;
    this.props.removeTicket({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        removeTicket: {
          __typename: 'Ticket',
          id,
          board: {
            __typename: 'Board',
            id: boardId,
          },
        },
      },
      update: (proxy, { data }) => {
        const prev = proxy.readQuery({ query });
        const next = store.removeTicketFromBoard(prev, {
          ticket: data.removeTicket,
        });
        proxy.writeQuery({ query, data: next });
      },
    });
  };

  handleMoveTicket = (boardId, ticket) => {
    const boardFrom = ticket.board.id;
    const boardTo = boardId;

    if (boardFrom === boardTo) return;

    this.props.moveTicket({
      variables: {
        boardId,
        ticketId: ticket.id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        moveTicket: {
          __typename: 'Ticket',
          ...ticket,
          board: {
            __typename: 'Board',
            id: boardId,
          },
        },
      },
      update: (proxy, { data }) => {
        const prev = proxy.readQuery({ query });
        const removed = store.removeTicketFromBoard(prev, {
          ticket: { ...data.moveTicket, board: { id: boardFrom } },
        });
        const added = store.addTicketToBoard(removed, {
          ticket: data.moveTicket,
        });
        proxy.writeQuery({ query, data: added });
      },
    });
  };

  render() {
    const { data } = this.props;

    if (data.loading) {
      return null;
    }

    return (
      <Boards
        boards={data.boards}
        onSaveBoard={this.handleSaveBoard}
        onSaveTicket={this.handleSaveTicket}
        onCreateTicket={this.handleCreateTicket}
        onRemoveTicket={this.handleRemoveTicket}
        onMoveTicket={this.handleMoveTicket}
      />
    );
  }
}

export default compose(
  graphql(query, {
    props: props => ({
      ...props,
      subsTicketAdded: () =>
        props.data.subscribeToMore({
          document: ticketAdded,
          updateQuery: (prev, { subscriptionData: { data } }) =>
            store.addTicketToBoard(prev, { ticket: data.ticketAdded }),
        }),
      subsTicketRemoved: () =>
        props.data.subscribeToMore({
          document: ticketRemoved,
          updateQuery: (prev, { subscriptionData: { data } }) =>
            store.removeTicketFromBoard(prev, { ticket: data.ticketRemoved }),
        }),
      subsTicketUpdated: () =>
        props.data.subscribeToMore({
          document: ticketUpdated,
          updateQuery: (prev, { subscriptionData: { data } }) =>
            store.updateTicketInBoard(prev, { ticket: data.tickets }),
        }),
      subsBoardUpdated: () =>
        props.data.subscribeToMore({
          document: boardUpdated,
          updateQuery: (prev, { subscriptionData: { data } }) =>
            store.updateBoard(prev, { board: data.boardUpdated }),
        }),
    }),
  }),
  graphql(updateBoard, { name: 'updateBoard' }),
  graphql(updateTicket, { name: 'updateTicket' }),
  graphql(createTicket, { name: 'createTicket' }),
  graphql(removeTicket, { name: 'removeTicket' }),
  graphql(moveTicket, { name: 'moveTicket' }),
)(BoardsContainer);
