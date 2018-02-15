import gql from 'graphql-tag';

export default gql`
mutation UpdateTicket($id: ID!, $ticket: TicketInput!) {
	updateTicket(id: $id, ticket: $ticket) {
    id,
    label,
    body
  }
}
`;
