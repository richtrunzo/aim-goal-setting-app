import React from 'react';
import { Polar } from 'react-chartjs-2';
import Random from './random-color';

const datachart = {
  datasets: [{
    data: [],
    backgroundColor: [],
    label: 'My goals'
  }],
  labels: []
};

export default class Polarchart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      data: null
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user-information'));
    const userId = parseInt(user);
    fetch(`/api/goals/${userId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        const arr = [...this.state.goals];
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i]);
          datachart.labels.push(data[i].goalName);
          datachart.datasets[0].data.push(data[i].goalCount);
          const x = Random();
          datachart.datasets[0].backgroundColor.push(x);
        }
        this.setState({
          goals: arr,
          data: datachart
        });
      });

  }

  componentWillUnmount() {
    datachart.labels = [];
    datachart.datasets[0].data = [];
    datachart.datasets[0].backgroundColor = [];

  }

  render() {
    if (this.state.goals.length > 0) {
      return (
      <div className="mt-5">
        <Polar data={this.state.data} />
      </div>
      );
    } else {
      return <div className="mt-5 d-flex justify-content-center">
        <h1>No Goals Saved</h1>
      </div>;
    }
  }
}
