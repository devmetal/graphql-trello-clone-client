import gql from 'graphql-tag';

export default gql`
  mutation RemoveTicket($id: ID!) {
    removeTicket(id: $id) {
      id
      board {
        id
      }
    }
  }
`;
