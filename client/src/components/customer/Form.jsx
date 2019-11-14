import React from 'react';
import { Link } from 'react-router-dom';

class CustomerForm extends React.PureComponent {
  render() {
    const props = this.props;

    return (
      <form onSubmit={props.handleSubmit} >

        <div className="form-row">
          <div className='form-group col-md-5'>
            <label htmlFor='nameFirst'>Firmenname</label>
            <input
              type='text'
              className='form-control'
              id='nameFirst'
              value="TODO"
              onChange={props.handleChange}
              required={true}
            />
          </div>
          <div className='form-group col-md-5'>
            <label htmlFor='nameFirst'>Kundennummer</label>
            <input
              type='text'
              className='form-control'
              id='nameFirst'
              value="TODO"
              onChange={props.handleChange}
              required={true}
            />
          </div>
          <div className='form-group col-md-2'>
            <label htmlFor='number'>TAV-Nr</label>
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
          <div className='form-group col-md-5'>
            <label htmlFor='nameFirst'>Vorname</label>
            <input
              type='text'
              className='form-control'
              id='nameFirst'
              value={props.nameFirst}
              onChange={props.handleChange}
              required={true}
            />
          </div>
          <div className='form-group col-md-5'>
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

        <div className='form-row'>
          <div className='form-group col-md-10'>
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
          <div className='form-group col-md-2'>
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

        <div className="form-row">
          <div className='form-group col-md-2'>
            <label htmlFor='number'>Grubengröße</label>
            <input
              type='number'
              className='form-control'
              id='number'
              value={props.number}
              onChange={props.handleChange}
              required={true}
            />
          </div>

          <div className='form-group col-md-2'>
            <label htmlFor='number'>Fahrzeug</label>
            <select className="form-control">
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option selected value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </div>

          <div className='form-group col-md-2'>
            <label htmlFor='number'>Startdatum</label>
            <input
              type='date'
              className='form-control'
              id='number'
              value={props.number}
              onChange={props.handleChange}
              required={true}
            />
          </div>

          <div className='form-group col-md-2'>
            <label htmlFor='number'>Intervall</label>
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
        customersdaten löschen
      </button>
    )
  }
}

export default CustomerForm;