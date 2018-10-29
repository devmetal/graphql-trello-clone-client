import React from 'react';
import { Mutation } from 'react-apollo';

import AuthForm from './AuthForm';
import mutation from './mutation/signUp';

const SignUp = ({ onSuccess, onError, onClickSignIn }) => (
  <Mutation mutation={mutation}>
    {(signUp, { loading }) => (
      <>
        <AuthForm
          disabled={loading}
          isSignUp={true}
          onSubmit={({ email, password }) => {
            signUp({ variables: { email, password } })
              .then(({ data }) => {
                const { createUser } = data;
                onSuccess(createUser);
              })
              .catch(e => {
                onError(e.message);
              });
          }}
        />
        <div>
          Already have account?
          <button onClick={onClickSignIn}>Click here</button>
        </div>
      </>
    )}
  </Mutation>
);

export default SignUp;
