import React, { useContext } from 'react';

const SignedUser = React.createContext({
  user: null,
  setUser: () => {},
});

function useSignedUser() {
  return useContext(SignedUser);
}

export { SignedUser, useSignedUser };
