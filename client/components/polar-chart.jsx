import React from 'react';
import { Polar } from 'react-chartjs-2';

const datachart = {
  datasets: [{
    data: [],
    backgroundColor: [
      '#FF6384',
      '#4BC0C0',
      '#FFCE56',
      '#E7E9ED',
      '#36A2EB'
    ],
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
    const userId = parseInt(user.userId);
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
        }
        this.setState({
          goals: arr,
          data: datachart
        });
      });
  }

  render() {
    return (
      <div className="mt-5">
        <Polar data={this.state.data} />
      </div>
    );
  }
}
