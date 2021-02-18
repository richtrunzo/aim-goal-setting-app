import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Random from './random-color';

const datachart = {
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: [],
    hoverBackgroundColor: []
  }]
};

export default class Donut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      data: null
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user-information'));
    const userId = parseInt(user.userId);
    console.log('thisRuns');
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
          const y = Random();
          datachart.datasets[0].hoverBackgroundColor.push(y);

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
    datachart.datasets[0].hoverBackgroundColor = [];

  }

  render() {
    return (
      <div className="mt-5">
        <Doughnut data={this.state.data} />
      </div>
    );
  }
}
