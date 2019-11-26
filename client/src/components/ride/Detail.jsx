import React from 'react';

import TaskPanel from '../shared/TaskPanel';

class RideDetails extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isError: false
        }

        this.fetchRide = this.fetchRide.bind(this);
        this.updateRide = this.updateRide.bind(this);
        this.finishRide = this.finishRide.bind(this);
        this.rejectRide = this.rejectRide.bind(this);
    }

    async fetchRide() {
        const id = this.props.match.params.id;

        try {
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/rides/${id}`
            const response = await fetch(url);
            const result = await response.json();

            const { consumer, state, date, quantity, notes } = result

            this.setState({
                consumer,
                date,
                state,
                quantity,
                notes
            });

        } catch {
            this.setState({
                isError: true
            });
        }
    }

    async updateRide() {
        const id = this.props.match.params.id;
        const ride = this.state;
        console.log("state", ride.state)
        try {
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/rides/${id}`;
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ride)
            });

            this.props.history.push(`/fahrten`);

        } catch {
            this.setState({
                isError: true
            });
        }
    }

    finishRide() {
        this.setState({
            state: 1
        }, () => {
            this.updateRide()
        });
    }

    rejectRide() {
        this.setState({
            state: 2
        }, () => {
            this.updateRide()
        });
    }

    componentDidMount() {
        this.fetchRide();
    }

    render() {
        const state = this.state;
        const consumer = state.consumer;

        if (!consumer) {
            return "No Consumer"
        }

        const date = new Date(state.date);

        return (
            <div className="container">
                <div className="pc-2 mt-4 mb-4 border-bottom">
                    <h1>Abholdetails</h1>
                </div>

                <TaskPanel>
                    <button
                        className="btn btn-primary mr-1"
                        onClick={this.finishRide}
                    >
                        Erledigt
                        </button>
                    <button
                        className="btn btn-primary mr-1"
                        onClick={this.rejectRide}
                    >
                        Ablehen
                    </button>
                    <button className="btn btn-primary mr-1">Delegieren</button>
                    <button className="btn btn-primary mr-1">Zurück</button>
                </TaskPanel>

                <div className="card">
                    <h5 className="card-header">{date.toString()}</h5>
                    <div className="card-body">

                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label htmlFor="customerNumber">Kundennummer</label>
                                <input
                                    className="form-control"
                                    id="customerNumber"
                                    type="text"
                                    value={consumer.customerNumber}
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-8">
                                <label htmlFor="company">Firma</label>
                                <input
                                    className="form-control"
                                    id="company"
                                    type="text"
                                    value={consumer.company}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="nameFirst">Vorname</label>
                                <input
                                    className="form-control"
                                    id="nameFirst"
                                    type="text"
                                    value={consumer.name.first}
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="nameLast">Nachname</label>
                                <input
                                    className="form-control"
                                    id="nameLast"
                                    type="text"
                                    value={consumer.name.last}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="street">Straße</label>
                                <input
                                    className="form-control"
                                    id="street"
                                    type="text"
                                    value={consumer.adress.street}
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="number">Hausnummer</label>
                                <input
                                    className="form-control"
                                    id="number"
                                    type="text"
                                    value={consumer.adress.number}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label htmlFor="zipcode">Postleitzahl</label>
                                <input
                                    className="form-control"
                                    id="zipcode"
                                    type="text"
                                    value={consumer.adress.zipcode}
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="city">Stadt</label>
                                <input
                                    className="form-control"
                                    id="city"
                                    type="text"
                                    value={consumer.adress.city}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="tavArea">TAV</label>
                                <input
                                    className="form-control"
                                    id="tavArea"
                                    type="text"
                                    value={consumer.tavArea}
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="quantity">Menge in m³</label>
                                <input
                                    className="form-control"
                                    id="quantity"
                                    type="text"
                                    value={state.quantity}
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="interval">Interval in Wochen</label>
                                <input
                                    className="form-control"
                                    id="interval"
                                    type="text"
                                    value={consumer.interval}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-8">
                                <label htmlFor="notes">Bemerkungen</label>
                                <textarea
                                    className="form-control"
                                    id="notes"
                                    type="text"
                                    rows="4"
                                    value={state.notes}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RideDetails;