import gql from 'graphql-tag';

export default gql`
mutation UpdateBoard($id: ID!, $label: String!) {
  updateBoard(id: $id, label:$label) {
    id,
    label,
  }
}
`;
