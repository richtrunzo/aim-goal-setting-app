import React from 'react';

export default class Track extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return <div className="d-flex justify-content-around mt-5">
            <button className="btn btn-primary orange text-two col" type="button">Bar Chart</button>
            <button className="btn btn-primary orange text-two col" type="button">Line Graph</button>
            <button className="btn btn-primary orange text-two col" type="button">Chart</button>
          </div>;
  }
}
