import "react-datepicker/dist/react-datepicker.css";

import React from 'react';
import Datepicker from 'react-datepicker';

const DatePicker = (props) => {
    const date = () => {
        return new Date(props.date);
    }

    return (
        <Datepicker
            className="form-control"
            dateFormat="dd/MM/yyy"
            selected={date()}
            onChange={props.onChange}
        />
    );
}

export default DatePicker;