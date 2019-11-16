import React from 'react';
import { Link } from 'react-router-dom';
import Datepicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

class CustomerForm extends React.PureComponent {

  handleDate = (date) => {
    console.log(date)
  }
  render() {
    const props = this.props;

    const startDate = new Date(props.startDate)
    console.log("start", startDate)
    return (
      <form onSubmit={props.handleSubmit} >

        <h4>Stammdaten</h4>
        <hr />

        <div className="form-row">
          <div className='form-group col-md-6'>
            <label htmlFor='customerNumber'>Kundennummer</label>
            <input
              type='text'
              id='customerNumber'
              className='form-control'
              value={props.customerNumber}
              onChange={props.handleChange}
              required={true}
            />
          </div>

          <div className='form-group col-md-6'>
            <label htmlFor='company'>Firmenname</label>
            {" "}
            <small id="companyHelpLine" class="text-muted">
              (Optional)
            </small>
            <input
              type='text'
              id='company'
              className='form-control'
              value={props.company}
              onChange={props.handleChange}
              required={true}
            />

          </div>
        </div>

        <div className='form-row'>
          <div className='form-group col-md-6'>
            <label htmlFor='nameFirst'>Vorname</label>
            <input
              type='text'
              id='nameFirst'
              className='form-control'
              value={props.nameFirst}
              onChange={props.handleChange}
              required={true}
            />
          </div>

          <div className='form-group col-md-6'>
            <label htmlFor='nameLast'>Nachname</label>
            <input
              type='text'
              className='form-control'
              id='nameLast'
              value={props.nameLast}
              onChange={props.handleChange}
              required={true}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="col-md-6  ">
            <h4>Adresse</h4>
            <hr />

            <div className='form-row'>
              <div className='form-group col-md-8'>
                <label htmlFor='street'>Straße</label>
                <input
                  type='text'
                  className='form-control'
                  id='street'
                  value={props.street}
                  onChange={props.handleChange}
                  required={true}
                />
              </div>

              <div className='form-group col-md-2'>
                <label htmlFor='number'>Hausnummer</label>
                <input
                  type='number'
                  className='form-control'
                  id='number'
                  value={props.number}
                  onChange={props.handleChange}
                  required={true}
                />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group col-md-4'>
                <label htmlFor='zipcode'>Postleitzahl</label>
                <input
                  type='number'
                  className='form-control'
                  id='zipcode'
                  value={props.zipcode}
                  onChange={props.handleChange}
                  required={true}
                />
              </div>
              <div className='form-group col-md-6'>
                <label htmlFor='city'>Stadt</label>
                <input
                  type='text'
                  className='form-control'
                  id='city'
                  value={props.city}
                  onChange={props.handleChange}
                  required={true}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h4>TAV</h4>
            <hr />
            <div className='form-group'>
              <label htmlFor='tavArea'>TAV-Gebiet</label>
              <input
                type='number'
                className='form-control'
                id='tavArea'
                value={props.tavArea}
                onChange={props.handleChange}
                required={true}
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="col-md-6">
            <h4>Abholung</h4>
            <hr />

            <div className="form-row">
              <div className='form-group col-md-6'>
                <label htmlFor='startDate'>Startdatum</label>
              
                <Datepicker
                  className="form-control"
                  dateFormat="dd/MM/yyy"
                  selected={startDate}
                  onChange={props.handleDate}
                  />
              </div>
              <div className='form-group col-md-6'>
                <label htmlFor='pitSize'>Grubengröße</label>
                <div className="input-group">
                  <input
                    type='number'
                    className='form-control'
                    id='pitSize'
                    value={props.pitSize}
                    onChange={props.handleChange}
                    required={true}
                  />
                  <div class="input-group-append">
                    <span class="input-group-text">m³</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className='form-group col-md-6'>
                <label htmlFor='interval'>Intervall</label>
                <input
                  type='number'
                  className='form-control'
                  id='interval'
                  value={props.interval}
                  onChange={props.handleChange}
                  required={true}
                />
              </div>
              <div className='form-group col-md-6'>
                <label htmlFor='car'>Fahrzeug</label>
                <select
                  id="car"
                  className="form-control"
                  onChange={props.handleChange}
                  value={props.car}
                >
                  <option value="grapefruit">Grapefruit</option>
                  <option value="lime">Lime</option>
                  <option selected value="coconut">Coconut</option>
                  <option value="mango">Mango</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h4>Notizen</h4>
            <hr />

            <div class="form-group">
              <label for="notes">Notizen</label>
              <textarea
                id="notes"
                class="form-control"
                rows="4"
                onChange={props.handleChange}
                value={props.notes}
              />
            </div>

          </div>

        </div>

        <button
          type='submit'
          className='btn btn-primary mr-2'
        >Übernehmen
        </button>
        <Link
          to='/'
          className='btn btn-secondary mr-2'>
          Abbrechen
        </Link>
        {this.renderDeleteButton()}
      </form>
    );
  }

  renderDeleteButton() {
    const id = this.props.id;

    if (!id) {
      return;
    }

    return (
      <button
        className='btn btn-danger mr-2'
        onClick={this.props.handleDelete}
      >
        Löschen
      </button>
    )
  }


}

export default CustomerForm;