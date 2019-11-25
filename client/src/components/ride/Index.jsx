import React from 'react';
import { Route, Switch } from 'react-router-dom';

import List from './List';

class RideIndex extends React.Component {

    render() {
        return (
            <Switch>
                <Route component={List} />
            </Switch>
        );
    }

    renderList() {
        return (
            <List />
        )
    }
}

export default RideIndex;