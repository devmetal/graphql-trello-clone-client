import gql from 'graphql-tag';

export default gql`
  subscription {
    boardUpdated {
      id
      label
    }
  }
`;
