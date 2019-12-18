import React from 'react';
import { Route, Switch } from 'react-router-dom';

import List from './List';
import Details from './Detail';

class RideIndex extends React.Component {

    render() {
        return (
            <Switch>
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
}

export default RideIndex;