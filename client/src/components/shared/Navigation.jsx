import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'

class Navigation extends React.PureComponent {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" title="Startseite" className="navbar-brand mb-0 h1">
          <img src={logo} width="150px" height="65px" alt="Abwasser Express Logo" />
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link to="/" className="nav-item nav-link" title="Kunden">Kunden</Link>
            <Link to="/fahrten" className="nav-item nav-link" title="Fahrten">Fahrten</Link>
            <Link to="/fahrzeuge" className="nav-item nav-link" title="Fahrzeuge">Fahrzeuge</Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;

