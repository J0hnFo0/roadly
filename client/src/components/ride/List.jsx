import React from 'react';
import { Link } from 'react-router-dom';

import TaskPanel from '../shared/TaskPanel';

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
        const today = new Date()

        return (
            <div className="container">
                <div className="pb-2 mt-4 mb-4 border-bottom">
                    <h1>Fahrtenliste</h1>
                </div>

                <TaskPanel>
                    <button className="btn btn-primary mr-1">Fahrt hinzufügen</button>
                    <button className="btn btn-primary mr-1">Fahrten anzeigen</button>
                </TaskPanel>

                <div className="card">
                    <h5 className="card-header">{today.toDateString()}</h5>
                    <div className="card-body p-0">
                        <table className="table mb-0">
                            <thead>
                                <th>#</th>
                                <th>Name</th>
                                <th>Ort</th>
                                <th>Straße</th>
                                <th>Nr</th>
                                <th>Kd-Nr.</th>
                                <th>m³</th>
                                <th>Intervall</th>
                                <th>Bemerkung</th>
                                <th>Auswahl</th>
                            </thead>
                            <tbody>
                                {this.renderTableBody()}
                            </tbody>
                        </table>
                    </div>
                </div>
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
                    <td>{x.consumer.adress.city}</td>
                    <td>{x.consumer.adress.street}</td>
                    <td>{x.consumer.adress.number}</td>
                    <td>{x.consumer.adress.zipcode}</td>
                    <td>{x.quantity}</td>
                    <td>{x.consumer.interval}</td>
                    <td>{x.notes ? x.notes : "./."}</td>
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

export default RideList;