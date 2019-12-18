import React from 'react';

import TaskPanel from '../shared/TaskPanel';

class RideReport extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                <div className="pb-2 mt-4 mb-4 border-bottom">
                    <h1>Report</h1>
                </div>
                <TaskPanel>
                    
                </TaskPanel>
            </div>
        );
    }
}

export default RideReport;