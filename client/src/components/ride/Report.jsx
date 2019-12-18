import React from 'react';
import { Link } from 'react-router-dom';

import TaskPanel from '../shared/TaskPanel';
import { states } from '../../utils/states';

class RideReport extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            rides: [],
            isError: false
        }
    }

    render() {
        return (
            <div className="container">
                <div className="pb-2 mt-4 mb-4 border-bottom">
                    <h1>Report</h1>
                </div>
                <TaskPanel>

                </TaskPanel>

                {this.renderTable()}
            </div>
        );
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