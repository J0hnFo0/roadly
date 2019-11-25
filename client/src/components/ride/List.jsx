import React from 'react';

import TaskPanel from '../shared/TaskPanel';

class RideList extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state ={
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
                <div className='pb-2 mt-4 mb-4 border-bottom'>
                    <h1>Fahrtenliste</h1>
                </div>

                <TaskPanel>
                        <button className="btn btn-primary mr-1">Fahrt hinzufügen</button>
                        <button className="btn btn-primary mr-1">Fahrten anzeigen</button>
                </TaskPanel>

                <div className="card">
                    <h5 className="card-header">Fahrten für 19.11.2019</h5>
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
                                <tr>
                                    <td>1</td>
                                    <td>Gustav Ganz</td>
                                    <td>Entenhausen</td>
                                    <td>Gülleweg</td>
                                    <td>13</td>
                                    <td>0815</td>
                                    <td>12</td>
                                    <td>1</td>
                                    <td>Bitte vorsichtig. Kunde schnappt.</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-info">
                                            Details
                                </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Boring Company</td>
                                    <td>Silicon Valley</td>
                                    <td>Facebookalley</td>
                                    <td>5</td>
                                    <td>0815</td>
                                    <td>1000</td>
                                    <td>4</td>
                                    <td>Bitte vorsichtig. Kunde hat Flammenwerfer.</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-info">
                                            Details
                                </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default RideList;