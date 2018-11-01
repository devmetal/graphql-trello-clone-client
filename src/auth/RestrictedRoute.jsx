import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { useUserContext } from './userContext';

const Restricted = ({ mustBe, component: Component, redirect, ...rest }) => {
  const { user } = useUserContext();

  const renderRoute = props => {
    const signed = user !== null;

    if (
      (signed === true && mustBe === 'signed') ||
      (signed === false && mustBe === 'stranger')
    ) {
      return <Component {...props} />;
    }

    return (
      <Redirect
        to={{
          ...redirect,
          state: { from: props.location },
        }}
      />
    );
  };

  return <Route {...rest} render={renderRoute} />;
};

Restricted.propTypes = {
  mustBe: PropTypes.oneOf(['signed', 'stranger']).isRequired,
};

export default Restricted;
