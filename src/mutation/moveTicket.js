import gql from 'graphql-tag';

export default gql`
mutation MoveTicket($ticketId: ID!, $boardId: ID!) {
  moveTicket(id: $ticketId, boardId: $boardId) {
    id
    body
    label
    comments {
      id
      body
    }
    board {
      id
    }
  }
}
`;
