import React from 'react';
import { Route, Switch } from 'react-router';


import CarIndex from './components/car/Index';
import CustomerIndex from './components/customer/Index';
import RidesIndex from './components/ride/Index';
import Navigation from './components/shared/Navigation';

import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div id="content">
          {this.renderContent()}
        </div>
      </div>
    );
  }

  renderContent() {
    return (
      <Switch>
        <Route path="/fahrten" render={this.renderRides} />
        <Route path="/fahrzeuge" render={this.renderCars} />
        <Route path="/" render={this.renderCustomers} />
      </Switch>
    );
  }

  renderCars() {
    return (
      <CarIndex />
    );
  }

  renderCustomers() {
    return (
      <CustomerIndex />
    );
  }

  renderRides() {
    return (
      <RidesIndex />
    );
  }
}

export default App;
