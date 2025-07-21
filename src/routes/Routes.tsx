import * as React from 'react';
import { Switch } from 'react-router';
import { Redirect, Route } from 'react-router';
import { REACT_ROUTES } from 'constants/constants';
import Home from 'features/Home';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={REACT_ROUTES.HOME} component={Home} />
      <Route path="*" component={(props) => <Redirect to={REACT_ROUTES.HOME} />} />
    </Switch>
  );
};

export default Routes;
