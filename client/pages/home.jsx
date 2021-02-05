import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      completed: []
    };
    this.noGoalsRender = this.noGoalsRender.bind(this);
    this.goalsRender = this.goalsRender.bind(this);
    this.completeGoal = this.completeGoal.bind(this);
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user-information'));
    const userId = parseInt(user.userId);
    console.log(userId);
    fetch(`/api/goals/${userId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        const arr = [...this.state.goals];
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i]);
        }
        this.setState({ goals: arr });
      });

    fetch('/api/getTimes', { method: 'GET' })
      .then(res => res.json())
      .then(data => console.log(data));
  }

  completeGoal() {
    const goalId = event.target.id;
    const count = event.target.completed;
    const goalObj = {
      goalId: event.target.id
    };
    console.log(this.state);
    console.log(goalId);

    this.state.goals.map((value, index) => {
      if (parseInt(goalId) === value.goalId && value.goalCount > 0) {
        fetch(`/api/updatecompletedTime/${goalId}`, { method: 'PATCH' })
          .then(res => res.json());

      } else if (parseInt(goalId) === value.goalId && value.goalCount === 0) {
        fetch('/api/completedTime/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(goalObj)
        })
          .then(res => res.json());
      }
    });

  }

  noGoalsRender() {
    return (<div>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="mt-5 col-6">
                <div className="mx-auto circle white border border-dark border-3">
                  <a href="#addgoal"><i className="icon-one position-relative top-50 start-50 translate-middle fas fa-plus"></i></a>
                </div>
              </div>
            </div>
          </div>
    );
  }

  goalsRender() {
    return <div>
        <div className="d-flex justify-content-between flex-wrap">
          {this.state.goals.map((value, index) => {
            return (<div id={value.goalId} key={value.goalId} className="mt-5 col-6" onDoubleClick={this.completeGoal}>
                      <div className="mx-auto circle white border border-dark border-3">
                        <i id={value.goalId} completed={value.goalCount} className={`icon-one position-relative top-50 start-50 translate-middle ${value.image}`} onClick={this.completeGoal}></i>
                      </div>
                      <p className="text-center text-two">{value.goalName}</p>
                    </div>);
          })
          }
            <div className="mt-5 col-6">
              <div className="mx-auto circle white border border-dark border-3">
                <a href="#addgoal"><i className="icon-one position-relative top-50 start-50 translate-middle fas fa-plus"></i></a>
              </div>
            </div>
      </div>
    </div>;

  }

  render() {
    if (this.state.goals.length > 0) {
      return this.goalsRender();
    } else {
      return this.noGoalsRender();
    }
  }
}
