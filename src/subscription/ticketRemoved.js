import gql from 'graphql-tag';

export default gql`
  subscription {
    ticketRemoved {
      id
      board {
        id
      }
    }
  }
`;
