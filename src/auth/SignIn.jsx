import React from 'react';
import { Mutation } from 'react-apollo';

import AuthForm from './AuthForm';
import mutation from './mutation/signIn';

const SignIn = ({ onSuccess, onError, onClickSignUp }) => (
  <Mutation mutation={mutation}>
    {(login, { loading }) => (
      <>
        <AuthForm
          disabled={loading}
          isSignUp={false}
          onSubmit={({ email, password }) => {
            login({ variables: { email, password } })
              .then(({ data }) => {
                const { login } = data;
                onSuccess(login);
              })
              .catch(e => {
                onError(e.message);
              });
          }}
        />
        <div>
          No account?
          <button onClick={onClickSignUp}>Click here!</button>
        </div>
      </>
    )}
  </Mutation>
);

export default SignIn;
