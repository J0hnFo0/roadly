import React from 'react';
import { Link } from 'react-router-dom';

import TaskPanel from '../shared/TaskPanel';
import Item from './Item';
import { states } from '../../utils/states';

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
                    <Link
                        to="/fahrten/erstellen"
                        className="btn btn-primary mr-1"
                    >
                        Fahrt hinzufügen
                    </Link>
                    <button className="btn btn-primary mr-1">Fahrten anzeigen</button>
                </TaskPanel>

                <div className="card">
                    <h5 className="card-header">{today.toDateString()}</h5>
                    <div className="card-body p-0">
                        {/*                         <div className="table-responsive">
                            <table className="table mb-0">
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
                        </div> */}
                        {this.renderList()}
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

        return (
            <React.Fragment>
                <div id="accordion">
                    {rides}
                </div>
            </React.Fragment>
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

export default RideList;