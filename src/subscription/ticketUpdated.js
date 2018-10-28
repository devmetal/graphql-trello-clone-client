import gql from 'graphql-tag';

export default gql`
  subscription {
    ticketUpdated {
      id
      label
      body
      board {
        id
      }
    }
  }
`;
