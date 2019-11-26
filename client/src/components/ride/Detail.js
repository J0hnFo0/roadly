import React from 'react';

import TaskPanel from '../shared/TaskPanel';

class RideDetails extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isError: false
        }
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
                        Details go here
                    </div>
                </div>
            </div>
        );
    }
}

export default RideDetails;