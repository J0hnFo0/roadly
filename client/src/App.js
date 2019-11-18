import React from 'react';
import { Route, Switch } from 'react-router';

import CustomerIndex from './components/customer/Index';
import RidesIndex from './components/ride/Index';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {this.renderContent()}
      </div>
    );
  }

  renderContent() {
    return (
      <Switch>
        <Route path="/fahrten" render={this.renderRides} />
        <Route path="/" render={this.renderCustomers} />
      </Switch>
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
