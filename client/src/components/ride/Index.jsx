import React from 'react';
import { Route, Switch } from 'react-router-dom';

import List from './List';
import Details from './Detail';
import Create from './Create';

class RideIndex extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path='/fahrten/erstellen' component={Create} />
                <Route exact path='/fahrten/:id' component={Details} />
                <Route component={List} />
            </Switch>
        );
    }

    renderList() {
        return (
            <List />
        );
    }

    renderCreateRide() {
        return (
            <Create />
        );
    }
}

export default RideIndex;