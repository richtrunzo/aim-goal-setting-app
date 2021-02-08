import React from 'react';
import Bargraph from '../components/bar-chart';
import Donut from '../components/donut-chart';
import Polarchart from '../components/polar-chart';

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null
    };
    this.onClick = this.onClick.bind(this);
    this.chartRender = this.chartRender.bind(this);
    this.renderCharts = this.renderCharts.bind(this);
  }

  onClick() {
    this.setState({ current: event.target.id });

  }

  chartRender() {
    if (this.state.current === 'polar') {
      return <Polarchart />;
    } else if (this.state.current === 'bar') {
      return <Bargraph />;
    } else if (this.state.current === 'doghnut') {
      return <Donut />;
    }
  }

  renderCharts() {
    return <React.Fragment>
          <div className="d-flex justify-content-around mt-5">
            <button id="bar" className="btn btn-primary orange text-two col" type="button" onClick={this.onClick}>Bar Chart</button>
            <button id="polar" className="btn btn-primary orange text-two col" type="button" onClick={this.onClick}>Polar Graph</button>
            <button id="doghnut" className="btn btn-primary orange text-two col" type="button" onClick={this.onClick}>Doughnut</button>
          </div>
          <div>
            {this.chartRender()}
          </div>
        </React.Fragment>;
  }

  render() {
    if (this.state.current === null) {
      return <div className="d-flex justify-content-around mt-5">
              <button id="bar" className="btn btn-primary orange text-two col" type="button" onClick={this.onClick}>Bar Chart</button>
              <button id="polar" className="btn btn-primary orange text-two col" type="button" onClick={this.onClick}>Polar Graph</button>
              <button id="doghnut" className="btn btn-primary orange text-two col" type="button" onClick={this.onClick}>Doghnut</button>
            </div>;

    } else {
      return this.renderCharts();
    }
  }
}
