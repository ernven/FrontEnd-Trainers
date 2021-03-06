import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, CssBaseline, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MenuButton from './components/MenuButton';
import CustomerList from './components/customers/CustomerList';
import TrainingsList from './components/trainings/TrainingsList';
import TrainingsCustomer from './components/trainings/TrainingsCustomer';
import Calendar from './components/Calendar';

function App() {
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <AppBar position="static" style={{ background: "#5fd455", transform: "translate3d(0, 0, 50px)", zIndex: 5 }} >
          <Toolbar >
            <MenuButton />
            <Typography variant='h6' >
              Personal Trainers Co.
            </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" component={CustomerList} />
          <Route path="/trainings" component={TrainingsList} />
          <Route path="/personal" component={TrainingsCustomer} />
          <Route path="/calendar" component={Calendar} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;