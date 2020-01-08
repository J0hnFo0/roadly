import React from 'react';
import { Link } from 'react-router-dom';

import DatePicker from '../shared/DatePicker';
import TaskPanel from '../shared/TaskPanel';
import FetchError from '../shared/FetchError';
import { states } from '../../utils/states';
import { baseUrl } from '../../utils/service';

class RideReport extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            from: new Date(),
            to: new Date(),
            rides: [],
            isError: false
        }

        this.handleFrom = this.handleFrom.bind(this);
        this.handleTo = this.handleTo.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    handleFrom = from => {
        this.setState({
            from
        }, () => this.refresh());
    }

    handleTo = to => {
        this.setState({
            to
        }, () => this.refresh());
    }

    async refresh() {
        const from = this.state.from;
        const to = this.state.to;

        const fromUrl = `${from.getFullYear()}-${(from.getMonth() + 1)}-${from.getDate()}`
        const toUrl = `${to.getUTCFullYear()}-${(to.getMonth() + 1)}-${to.getDate()}`
        
        const query = `from=${fromUrl}&to=${toUrl}`;

        try {
            const response = await fetch(`${baseUrl}rides/all?${query}`);
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
                    <h1>Report</h1>
                </div>

                <TaskPanel>
                    <div className="form-row">
                        <span className="mr-1">
                            <DatePicker
                                date={this.state.from}
                                onChange={this.handleFrom}
                            />
                        </span>
                        <span className="mr-1">
                            <DatePicker
                                date={this.state.to}
                                onChange={this.handleTo}
                            />
                        </span>
                        <Link
                            to="/fahrten"
                            className="btn btn-primary"
                        >
                            Zurück
                    </Link>
                    </div>
                </TaskPanel>
                {this.state.isError ? this.renderFetchError() : this.renderTable()}
            </div>
        );
    }

    renderFetchError() {
        if (!this.state.isError) {
            return;
        }

        return <FetchError />
    }

    renderTable() {
        return (
            <div className="table">
                <table className="table">
                    <thead>
                        <th>#</th>
                        <th>Name</th>
                        <th>Ort</th>
                        <th>Adresse</th>
                        <th>m³</th>
                        <th>Interv.</th>
                        <th>Datum</th>
                        <th>Status</th>
                        <th>Auswahl</th>
                    </thead>
                    <tbody>
                        {this.renderTableBody()}
                    </tbody>
                </table>
            </div>
        );
    }

    renderTableBody() {
        if (!this.state.rides) {
            return;
        }

        const rides = this.state.rides.map((x, i) =>
            <React.Fragment>
                <tr id={i}>
                    <td>{i + 1}</td>
                    <td>
                        {
                            x.consumer.company
                                ? x.consumer.company
                                : `${x.consumer.name.first} ${x.consumer.name.last}`
                        }
                    </td>
                    <td>{x.consumer.adress.zipcode} {x.consumer.adress.city}</td>
                    <td>{x.consumer.adress.street} {x.consumer.adress.number}</td>
                    <td>{x.quantity}</td>
                    <td>{x.consumer.interval}</td>
                    <td>{new Date(x.date).toLocaleDateString()}</td>
                    <td>{states[x.state]}</td>
                    <td>
                        <Link
                            to={`/fahrten/${x._id}`}
                            className="btn btn-sm btn-outline-info"
                        >
                            Details
                        </Link>
                    </td>
                </tr>
            </React.Fragment>
        );

        return rides;
    }
}

export default RideReport;