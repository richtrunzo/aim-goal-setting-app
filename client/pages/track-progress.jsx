import React from 'react';
import Bargraph from '../components/bar-chart';
import Donut from '../components/donut-chart';
import Polarchart from '../components/polar-chart';
import Allgoals from '../components/all-goals';

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
    if (this.state.current === 'bar') {
      return <React.Fragment>
        <div className="d-flex justify-content-center mt-5 width mx-auto">
          <button id="bar" className="btn border border-dark border-1 lgreen text-two col radius" type="button" onClick={this.onClick}><i id="bar" className="icon-one white-text fas fa-chart-bar" onClick={this.onClick}></i></button>
          <button id="polar" className="btn border border-dark border-1 dgreen col text-two radius" type="button" onClick={this.onClick}><i id="polar" className="icon-one white-text fas fa-sun" onClick={this.onClick}></i></button>
          <button id="doghnut" className="btn border border-dark border-1 dgreen text-two col radius" type="button" onClick={this.onClick}><i id="doghnut" className="icon-one white-text fas fa-chart-pie" onClick={this.onClick}></i></button>
        </div>
        <Allgoals />
        <div>
          {this.chartRender()}
        </div>
      </React.Fragment>;

    } else if (this.state.current === 'polar') {
      return <React.Fragment>
        <div className="d-flex justify-content-center mt-5 width mx-auto">
            <button id="bar" className="btn dgreen border border-dark border-1 text-two col radius" type="button" onClick={this.onClick}><i id="bar" className="icon-one white-text fas fa-chart-bar" onClick={this.onClick}></i></button>
            <button id="polar" className="btn lgreen border border-dark border-1 col text-two radius" type="button" onClick={this.onClick}><i id="polar" className="icon-one white-text fas fa-sun" onClick={this.onClick}></i></button>
            <button id="doghnut" className="btn dgreen border border-dark border-1 text-two col radius" type="button" onClick={this.onClick}><i id="doghnut" className="icon-one white-text fas fa-chart-pie" onClick={this.onClick}></i></button>
          </div>
          <Allgoals />
          <div>
            {this.chartRender()}
          </div>
        </React.Fragment>;
    } else {
      return <React.Fragment>
        <div className="d-flex justify-content-center mt-5 width mx-auto">
          <button id="bar" className="btn dgreen border border-dark border-1 text-two col radius" type="button" onClick={this.onClick}><i id="bar" className="icon-one white-text fas fa-chart-bar" onClick={this.onClick}></i></button>
          <button id="polar" className="btn dgreen border border-dark border-1 col text-two radius" type="button" onClick={this.onClick}><i id="polar" className="icon-one white-text fas fa-sun" onClick={this.onClick}></i></button>
          <button id="doghnut" className="btn lgreen border border-dark border-1 text-two col radius" type="button" onClick={this.onClick}><i id="doghnut" className="icon-one white-text fas fa-chart-pie" onClick={this.onClick}></i></button>
        </div>
        <Allgoals />
        <div>
          {this.chartRender()}
        </div>
      </React.Fragment>;

    }
  }

  render() {
    if (this.state.current === null) {
      return <React.Fragment>
              <div className="d-flex justify-content-center mt-5 width mx-auto">
                <button id="bar" className="btn dgreen border border-dark border-1 text-two col radius" type="button" onClick={this.onClick}><i className="icon-one white-text fas fa-chart-bar" id="bar" onClick={this.onClick}></i></button>
                <button id="polar" className="btn dgreen border border-dark border-1 text-two col radius" type="button" onClick={this.onClick}><i className="icon-one white-text fas fa-sun" id="polar" onClick={this.onClick}></i></button>
                <button id="doghnut" className="btn dgreen border border-dark border-1 text-two col radius" type="button" onClick={this.onClick}><i className="icon-one white-text fas fa-chart-pie" id="doghnut" onClick={this.onClick}></i></button>
              </div>
              <Allgoals />
            </React.Fragment>;

    } else {
      return this.renderCharts();
    }
  }
}
