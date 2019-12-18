import React from 'react';
import DatePicker from '../shared/DatePicker';

class CreateRide extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            customer: "",
            customerIndex: 0,
            customers: [],
            pickUpDate: new Date(),
            isError: false
        }

        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCustomerChange(e) {
        e.preventDefault();

        this.setState({
            customer: this.state.customers[e.target.value],
            customerIndex: e.target.value
        })
    }

    handleDateChange = pickUpDate => {
        this.setState({
            pickUpDate
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
        const pickUpDate = this.state.pickUpDate;
        const ride = {
            customer,
            pickUpDate
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
            <option key={i} value={i}>
                {
                    x.company
                        ? x.company
                        : x.name.first + " " + x.name.last
                }
            </option>
        )

        return (
            <div className="container">
                <div className='pb-2 mt-4 mb-4 border-bottom'>
                    <h1>Fahrt anlegen</h1>
                </div>

                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="customer">Kunde</label>
                        <select
                            id="customer"
                            className="form-control"
                            onChange={this.handleCustomerChange}
                            value={state.customerIndex}
                        >
                            {options}
                        </select>

                    </div>
                    <div className="form-group">
                        <DatePicker
                            date={state.pickUpDate}
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