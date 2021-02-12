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
    // WIll NEED CHANGED WHEN AUTH IS IMPLEMENTED
    const user = JSON.parse(localStorage.getItem('user-information'));
    const userId = parseInt(user.userId);
    fetch(`/api/goals/${userId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const arr = [...this.state.goals];
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i]);
        }
        this.setState({ goals: arr });
      });

    fetch('/api/getTimes', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ completed: data });
        console.log(this.state);
      });
  }

  completeGoal() {
    const goalId = event.target.id;
    const goalObj = {
      goalId: event.target.id,
      goalCount: null
    };
    console.log(goalObj);

    this.state.goals.map((value, index) => {
      if (parseInt(goalId) === value.goalId) {
        console.log(value);
        console.log(value.goalCount);
        goalObj.goalCount = value.goalCount + 1;
      }
    });

    console.log(goalObj);

    fetch('api/updategoal', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goalObj)
    })
      .then(res => res.json());
  }

  toggleClass() {
    this.setState({
      goals: [],
      completed: [],
      active: event.target.id
    });

    // WIll NEED CHANGED WHEN AUTH IS IMPLEMENTED
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
        this.setState({ completed: data });
      });
  }

  onClick() {
    this.completeGoal();
    this.toggleClass();

  }

  noGoalsRender() {
    return <div>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="mt-5 col-6">
                <div className="mx-auto circle white border border-dark border-1 shadow">
                  <a href="#addgoal"><i className="icon-one position-relative top-50 start-50 translate-middle fas fa-plus"></i></a>
                </div>
              </div>
            </div>
          </div>;
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

    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap">
          {combinedState.map((value, index) => {
            if (parseInt(this.state.active) === value.goalId) {
              return (<div id={value.goalId} key={value.goalId} className="mt-5 col-6">
                <div className="mx-auto circle lgreen border border-dark border-1 shadow-lg animate__animated animate__bounceIn">
                  <i id={value.goalId} completed={value.goalCount} className={`icon-one position-relative top-50 start-50 translate-middle dgrey-text icon-animation ${value.image}`}></i>
                </div>
                <p className="text-center text-two">{value.goalName}</p>
              </div>);
            } else if (value.timeCompleted === false || value.timeCompleted === undefined) {
              return (<div id={value.goalId} key={value.goalId} className="mt-5 col-6">
                <div id={value.goalId} className="mx-auto circle dgrey border border-dark border-1 shadow-lg animate__animated animate__bounceIn">
                  <i id={value.goalId} name="icon" completed={value.goalCount} className={`icon-one position-relative top-50 start-50 translate-middle lgreen-text ${value.image}`} onClick={this.onClick}></i>
                      </div>
                      <p className="text-center text-two">{value.goalName}</p>
                    </div>);
            } else if (value.timeCompleted === true) {
              return (<div id={value.goalId} key={value.goalId} className="mt-5 col-6">
                <div className="mx-auto circle lgreen border border-dark border-1 shadow-lg animate__animated animate__bounceIn">
                  <i id={value.goalId} completed={value.goalCount} className={`icon-one position-relative top-50 start-50 translate-middle dgrey-text ${value.image}`}></i>
                </div>
                <p className="text-center text-two">{value.goalName}</p>
              </div>);
            }
          })
          }
            <div className="mt-5 col-6">
              <div className="mx-auto circle dgrey border border-dark border-1 shadow animate__animated animate__bounceIn">
              <a href="#addgoal"><i className="icon-one position-relative top-50 start-50 translate-middle lgreen-text fas fa-plus"></i></a>
              </div>
            </div>
      </div>
    </div>
    );
  }

  render() {
    if (this.state.goals.length > 0) {
      return this.goalsRender();
    } else {
      return this.noGoalsRender();
    }
  }
}
