import gql from 'graphql-tag';

export default gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password)
  }
`;
