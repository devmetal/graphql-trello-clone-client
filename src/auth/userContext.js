import React, { useContext } from 'react';

const UserContext = React.createContext({
  user: null,
  setUser: () => {},
});

function useUserContext() {
  return useContext(UserContext);
}

export { UserContext, useUserContext };
