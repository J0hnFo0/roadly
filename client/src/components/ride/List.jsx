import React from 'react';
import { Link } from 'react-router-dom';

import TaskPanel from '../shared/TaskPanel';
import Item from './Item';
import Create from './Create';
import FetchError from '../shared/FetchError';

class RideList extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isError: false
        }
    }

    async refresh() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/rides`);
            const result = await response.json();

            this.setState({
                rides: result.rides
            });

        } catch {
            this.setState({
                isError: true
            });
        }
    }

    componentDidMount() {
        this.refresh();
    }

    render() {
        return (
            <div className="container">
                <div className="pb-2 mt-4 mb-4 border-bottom">
                    <h1>Fahrtenliste</h1>
                </div>
                <TaskPanel>
                    <button
                        className="btn btn-primary mr-1"
                        data-toggle="collapse"
                        data-target="#create-ride"
                        aria-expanded="false"
                    >
                        Fahrt hinzufügen
                    </button>
                    <Link
                        to="/fahrten/auswertung"
                        className="btn btn-primary mr-1"
                    >
                        Fahrten anzeigen
                    </Link>
                </TaskPanel>
                {this.renderFetchError()}
                {this.renderCreate()}
                {this.renderList()}
            </div>
        );
    }

    renderFetchError() {
        if (!this.state.isError) {
            return;
        }

        return (
            <FetchError />
        );
    }

    renderCreate() {
        return (
            <div className="collapse" id="create-ride">
                <div className="card mb-3">
                    <div className='card-header'>Neue Fahrt hinzufügen</div>
                    <div className="card-body">
                        <Create
                            onCreated={this.refresh}
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderList() {
        if (!this.state.rides) {
            return;
        }

        const rides = this.state.rides.map((x, i) =>
            <Item
                index={i}
                id={x._id}
                consumer={x.consumer}
            />
        )

        const today = new Date();
        return (
            <React.Fragment>
                <div className="pb-2 mt-4 mb-4 border-bottom">
                    <h2>Fahrten Heute: {today.toDateString()}</h2>
                </div>
                <div id="accordion" className="mb-5">
                    {rides}
                    <hr />
                </div>
            </React.Fragment>
        );
    }
}

export default RideList;