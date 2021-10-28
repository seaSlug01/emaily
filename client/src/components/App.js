import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styled from 'styled-components';

import Header from './header/Header';
import Landing from './Landing';
import Portal from './Portal';

const Dashboard = () => {
  return <h2>Dashboard</h2>;
};

const SurveyNew = () => {
  return <h2>SurveyNew</h2>;
};

const App = props => {
  const { fetchUser, portal } = props;

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Router>
      <Header />
      <Main>
        <Route exact path='/' component={Landing} />
        <Route exact path='/surveys' component={Dashboard} />
        <Route path='/surveys/new' component={SurveyNew} />
      </Main>
      <Portal show={portal} />
    </Router>
  );
};

const Main = styled.main`
  margin-top: 8rem;
  padding: 0 10rem;
`;

const mapStateToProps = ({ portal }) => ({
  portal
});

export default connect(mapStateToProps, actions)(App);
