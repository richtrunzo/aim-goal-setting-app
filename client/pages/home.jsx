import React from 'react';
import Today from '../components/date-check';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      completed: [],
      active: null
    };
    this.noGoalsRender = this.noGoalsRender.bind(this);
    this.goalsRender = this.goalsRender.bind(this);
    this.completeGoal = this.completeGoal.bind(this);
    this.onClick = this.onClick.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
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
        }
        this.setState({ goals: arr });
      });

    fetch('/api/getTimes', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        const arr = [...this.state.completed];
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i]);
        }
        for (let i = 0; i < arr.length; i++) {
          if (Today(arr[i].timeCompleted) > 0) {
            arr[i].timeCompleted = true;
          } else if (Today(arr[i].timeComepleted) < 0) {
            arr[i].timeCompleted = false;
          }
        }
        this.setState({ completed: arr });
      });
  }

  completeGoal() {
    const goalId = event.target.id;
    const goalObj = {
      goalId: event.target.id
    };

    const combinedState = [...this.state.goals];
    const completedState = [...this.state.completed];

    combinedState.map((value, index) => {
      completedState.map((newvalue, newindex) => {
        if (value.goalId === newvalue.goalId) {
          combinedState[index].timeCompleted = completedState[newindex].timeCompleted;
        }
      });
    });

    combinedState.map((value, index) => {
      if (parseInt(goalId) === value.goalId && value.goalCount > 0 && value.timeCompleted === false) {
        fetch(`/api/updatecompletedTime/${goalId}`, { method: 'PATCH' })
          .then(res => res.json());

        const counter = value.goalCount + 1;
        const count = {
          goalId: goalId,
          count: counter
        };
        fetch('api/goalcount', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(count)
        })
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

        const counter = value.goalCount + 1;
        const count = {
          goalId: goalId,
          count: counter
        };
        fetch('api/goalcount', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(count)
        })
          .then(res => res.json());
      }
    });
  }

  toggleClass() {
    this.setState({ active: event.target.id });
  }

  onClick() {
    this.completeGoal();
    this.toggleClass();

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
    const combinedState = [...this.state.goals];
    const completedState = [...this.state.completed];

    combinedState.map((value, index) => {
      completedState.map((newvalue, newindex) => {
        if (value.goalId === newvalue.goalId) {
          combinedState[index].timeCompleted = completedState[newindex].timeCompleted;
        }
      });
    });

    return <div>
        <div className="d-flex justify-content-between flex-wrap">
          {combinedState.map((value, index) => {
            if (parseInt(this.state.active) === value.goalId) {
              return (<div id={value.goalId} key={value.goalId} className="mt-5 col-6">
                <div className="mx-auto circle green border border-dark border-3">
                  <i id={value.goalId} completed={value.goalCount} className={`icon-one position-relative top-50 start-50 translate-middle ${value.image}`}></i>
                </div>
                <p className="text-center text-two">{value.goalName}</p>
              </div>);
            } else if (value.timeCompleted === false || value.timeCompleted === undefined) {
              return (<div id={value.goalId} key={value.goalId} className="mt-5 col-6">
                <div id={value.goalId} className="mx-auto circle white border border-dark border-3" onClick={this.onClick}>
                  <i id={value.goalId} name="icon" completed={value.goalCount} className={`icon-one position-relative top-50 start-50 translate-middle ${value.image}`} onClick={this.onClick}></i>
                      </div>
                      <p className="text-center text-two">{value.goalName}</p>
                    </div>);
            } else if (value.timeCompleted === true) {
              return (<div id={value.goalId} key={value.goalId} className="mt-5 col-6">
                <div className="mx-auto circle green border border-dark border-3">
                  <i id={value.goalId} completed={value.goalCount} className={`icon-one position-relative top-50 start-50 translate-middle ${value.image}`}></i>
                </div>
                <p className="text-center text-two">{value.goalName}</p>
              </div>);
            }
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
