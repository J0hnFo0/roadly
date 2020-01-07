import React from 'react';

class FetchError extends React.PureComponent {
  render() {
    return (
      <div class="alert alert-danger" role="alert">
        Ein Fehler ist aufgetreten. Bitte laden Sie die Seite neu oder wenden Sie sich an den Support.
      </div>
    );
  }
}

export default FetchError;
