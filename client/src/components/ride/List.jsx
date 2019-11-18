import React from 'react';

import TaskPanel from '../shared/TaskPanel';

class RideList extends React.PureComponent {
    render() {
        return (
            <div className="container">
                <div className='pb-2 mt-4 mb-4 border-bottom'>
                    <h1>Fahrtenliste</h1>
                </div>

                <TaskPanel></TaskPanel>
            </div>
        );
    }
}

export default RideList;