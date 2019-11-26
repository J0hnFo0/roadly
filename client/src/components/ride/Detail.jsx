import React from 'react';

import TaskPanel from '../shared/TaskPanel';

class RideDetails extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isError: false
        }
    }

    async fetchRide() {
        const id = this.props.match.params.id;

        try {
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/rides/${id}`
            const response = await fetch(url);
            const ride = await response.json();

            this.setState({ride});

        } catch {
            this.setState({
                isError: true
            });
        }
    }

    componentDidMount() {
        this.fetchRide();
    }

    render() {
        return (
            <div className="container">
                <div className="pc-2 mt-4 mb-4 border-bottom">
                    <h1>Abholdetails</h1>
                </div>

                <TaskPanel>
                    <button className="btn btn-primary mr-1">Erledigt</button>
                    <button className="btn btn-primary mr-1">Ablehen</button>
                    <button className="btn btn-primary mr-1">Delegieren</button>
                    <button className="btn btn-primary mr-1">Zurück</button>
                </TaskPanel>

                <div className="card">
                    <h5 className="card-header">Fahrt Nr. Z-1234</h5>
                    <div className="card-body">

                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label htmlFor="disabledInput">Kundennummer</label>
                                <input
                                    className="form-control"
                                    id="disabledInput"
                                    type="text"
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-8">
                                <label htmlFor="disabledInput">Firma</label>
                                <input
                                    className="form-control"
                                    id="disabledInput"
                                    type="text"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="disabledInput">Vorname</label>
                                <input
                                    className="form-control"
                                    id="disabledInput"
                                    type="text"
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="disabledInput">Nachname</label>
                                <input
                                    className="form-control"
                                    id="disabledInput"
                                    type="text"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="disabledInput">Straße</label>
                                <input
                                    className="form-control"
                                    id="disabledInput"
                                    type="text"
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="disabledInput">Hausnummer</label>
                                <input
                                    className="form-control"
                                    id="disabledInput"
                                    type="text"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label htmlFor="disabledInput">Postleitzahl</label>
                                <input
                                    className="form-control"
                                    id="disabledInput"
                                    type="text"
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="disabledInput">Stadt</label>
                                <input
                                    className="form-control"
                                    id="disabledInput"
                                    type="text"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="disabledInput">TAV</label>
                                <input
                                    className="form-control"
                                    id="disabledInput"
                                    type="text"
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="disabledInput">Menge</label>
                                <input
                                    className="form-control"
                                    id="disabledInput"
                                    type="text"
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="disabledInput">Interval</label>
                                <input
                                    className="form-control"
                                    id="disabledInput"
                                    type="text"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-8">
                                <label htmlFor="disabledInput">Bemerkungen</label>
                                <textarea
                                    className="form-control"
                                    id="disabledInput"
                                    type="text"
                                    rows="4"
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