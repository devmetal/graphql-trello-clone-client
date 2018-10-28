import gql from 'graphql-tag';

export default gql`
  mutation CreateTicket($ticket: TicketInput!) {
    createTicket(ticket: $ticket) {
      id
      label
      body
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
