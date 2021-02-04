import React from 'react';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <>
           <div className="d-grid gap-2 mt-5">
              <button className="btn btn-primary settings-btn orange mt-5 mb-5 mx-auto text-two" type="button">Track Progress</button>
           </div>
           <div className="d-grid gap-2 mt-5">
              <button className="btn btn-primary settings-btn orange mt-5 mb-5 mx-auto text-two" type="button"><a>Edit Goals</a></button>
           </div>
           </>;
  }
}
