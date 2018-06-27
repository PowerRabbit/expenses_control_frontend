import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Auth from '../components/auth/auth.component';
import Profile from '../components/profile/profile.component';

const AppRouter = () => (
  <Router>
      <div>
        <Route exact path="/" component={Profile} />
        <Route path="/auth" component={Auth} />
      </div>
  </Router>
);

export default AppRouter;