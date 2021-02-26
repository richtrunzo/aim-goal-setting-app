import React from 'react';

export default class Allgoals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goalcount: null
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
        let count = 0;
        for (let i = 0; i < data.length; i++) {
          count += data[i].goalCount;
        }
        this.setState({
          goalcount: count
        });
      });
  }

  render() {
    return <div className="d-flex justify-content-center">
              <p className="text-two text-center mt-5 dgreen-text width">Total goals completed: {this.state.goalcount}</p>
          </div>;
  }
}
