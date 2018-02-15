import gql from 'graphql-tag';

export default gql`
{
  boards {
    id,
    label,
    tickets {
      id,
      label,
      body,
      board {
        id
      }
      comments {
        id,
        body
      }
    }
  }
}
`;
