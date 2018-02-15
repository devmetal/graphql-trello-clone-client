import gql from 'graphql-tag';

export default gql`
subscription {
  ticketAdded {
    id,
    label,
    body,
    board {
      id
    },
    comments {
      id,
      body
    }
  }
}
`
