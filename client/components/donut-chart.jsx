import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [100, 50, 20],
    backgroundColor: [
      '#CCC',
      '#36A2EB',
      '#FFCE56'
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ]
  }]
};

export default class Donut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ data: data });
    }, 500);
  }

  render() {
    return (
      <div className="mt-5">
        <Doughnut data={this.state.data} />
      </div>
    );
  }
}
