import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Create from './Create';
import Edit from './Edit';
import List from './List';

class CarIndex extends React.Component {
  constructor(props) {
    super(props)

    this.renderEdit = this.renderEdit.bind(this);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/fahrzeuge/bearbeiten/:id' render={(props) => this.renderEdit(props)} />
        <Route exact path='/fahrzeuge/erstellen' render={this.renderCreate} />
        <Route component={List} />
      </Switch>
    );
  }

  renderCreate() {
    return (
      <Create />
    );
  }

  renderEdit(props) {
    const id = props.match.params.id;

    return (
      <Edit
        id={id}
      />
    );
  }
}

export default CarIndex;
