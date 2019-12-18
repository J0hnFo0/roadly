import React from 'react';
import DatePicker from '../shared/DatePicker';

class CreateRide extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            customer: "",
            customers: [],
            date: new Date(),
            isError: false
        }

        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCustomerChange(e) {
        e.preventDefault();

        this.setState({
            customer: this.state.customers[e.target.value]
        })
    }

    handleDateChange = date => {
        this.setState({
            date
        });
    }

    async fetchCustomers() {
        try {
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/customers?nachname=`;
            const response = await fetch(url);
            const customers = await response.json();

            this.setState({
                customers,
            });

        } catch {
            this.setState({
                isError: true,
            });
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.state.customer) {
            return;
        }

        const customer = this.state.customer;
        const date = this.state.date;
        const ride = {
            customer,
            date
        }

        try {
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/rides`;
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ride)
            });

        } catch {
            this.setState({
                isError: true
            });
        }
    }

    componentDidMount() {
        this.fetchCustomers();
    }

    render() {
        const state = this.state;
        const customers = state.customers;
        const options = customers.map((x, i) =>
            <option key={i} value={i}>{x.name.last}</option>
        )

        return (
            <div className="container">
                <div className='pb-2 mt-4 mb-4 border-bottom'>
                    <h1>Fahrt anlegen</h1>
                </div>

                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="form-group col-md-6">
                        <label htmlFor="customer">Kunde</label>
                        <select
                            id="customer"
                            className="form-control"
                            onChange={this.handleCustomerChange}
                            value={state.customer}
                        >
                            {options}
                        </select>

                    </div>
                    <div className="form-group col-md-6">
                        <DatePicker
                            date={state.date}
                            onChange={this.handleDateChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Fahrt erstellen
                    </button>
                </form>

            </div>
        );
    }
}

export default CreateRide;