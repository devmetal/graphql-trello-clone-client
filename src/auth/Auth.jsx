import React from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp';

const Auth = ({
  isSignUp,
  onError,
  onSuccess,
  onClickSignIn,
  onClickSignUp,
}) => {
  if (isSignUp) {
    return (
      <SignUp
        onSuccess={onSuccess}
        onError={onError}
        onClickSignIn={onClickSignIn}
      />
    );
  }
  return (
    <SignIn
      onSuccess={onSuccess}
      onError={onError}
      onClickSignUp={onClickSignUp}
    />
  );
};

export default Auth;
