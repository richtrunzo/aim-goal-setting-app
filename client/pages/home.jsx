import React from 'react';
import today from '../components/date-check';

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
    const userId = parseInt(user);
    fetch(`/api/goals/${userId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        const arr = [];
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i]);
        }
        for (let i = 0; i < arr.length; i++) {
          if (today(arr[i].timeCompleted) > 0) {
            arr[i].timeCompleted = true;
          } else if (today(arr[i].timeCompleted) < 0) {
            arr[i].timeCompleted = false;
          }
        }
        this.setState({ goals: arr });
      });
  }

  completeGoal() {
    const goalId = event.target.id;
    const goalObj = {
      goalId: event.target.id,
      goalCount: null
    };

    this.state.goals.map((value, index) => {
      if (parseInt(goalId) === value.goalId) {
        goalObj.goalCount = value.goalCount + 1;
      }
    });

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
      active: event.target.id
    });

    // WIll NEED CHANGED WHEN AUTH IS IMPLEMENTED
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
        }
        for (let i = 0; i < arr.length; i++) {
          if (today(arr[i].timeCompleted) > 0) {
            arr[i].timeCompleted = true;
          } else if (today(arr[i].timeCompleted) < 0) {
            arr[i].timeCompleted = false;
          }
        }
        this.setState({ goals: arr });
      });
  }

  onClick() {
    this.completeGoal();
    this.toggleClass();

  }

  componentWillUnmount() {
    this.setState({ goals: [] });
  }

  noGoalsRender() {
    return <div>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="mt-5 d-height col-6">
          <div className="mx-auto circle circle-size margin-top dgrey border border-dark border-1 shadow-lg animate__animated animate__bounceIn">
                  <a href="#addgoal"><i className="icon-one position-relative top-50 start-50 translate-middle lgreen-text fas fa-plus big-icon"></i></a>
                </div>
              </div>
            </div>
          </div>;
  }

  goalsRender() {
    return (<div>
    <div className="d-flex justify-content-between flex-wrap">
          {this.state.goals.map((value, index) => {
            if (parseInt(this.state.active) === value.goalId) {
              return <div id={value.goalId} key={value.goalId} className="mt-5 d-height col-6">
                <div className="mx-auto circle circle-size lgreen margin-top border border-dark border-1 shadow-lg animate__animated animate__bounceIn">
                  <i id={value.goalId} completed={value.goalCount} className="icon-one position-relative top-50 start-50 translate-middle dgrey-text fas fa-check big-icon"></i>
                </div>
                <p className="text-center text-two big-text">{value.goalName}</p>
              </div>;
            } else if (value.timeCompleted === false || value.timeCompleted === undefined) {
              return <div id={value.goalId} key={value.goalId} className="mt-5 d-height col-6">
                <div id={value.goalId} className="mx-auto circle margin-top circle-size dgrey border border-dark border-1 shadow-lg animate__animated animate__bounceIn">
                  <i id={value.goalId} name="icon" completed={value.goalCount} className={`icon-one position-relative top-50 start-50 translate-middle big-icon lgreen-text ${value.image}`} onClick={this.onClick}></i>
                      </div>
                      <p className="text-center text-two big-text">{value.goalName}</p>
                    </div>;
            } else if (value.timeCompleted === true) {
              return <div id={value.goalId} key={value.goalId} className="mt-5 d-height col-6">
                <div className="mx-auto margin-top circle circle-size lgreen border border-dark border-1 shadow-lg animate__animated animate__bounceIn">
                  <i id={value.goalId} completed={value.goalCount} className="icon-one position-relative top-50 start-50 translate-middle dgrey-text big-icon fas fa-check"></i>
                </div>
                <p className="text-center text-two big-text">{value.goalName}</p>
              </div>;
            }
          })}
            <div className="mt-5 d-height col-6">
              <div className="mx-auto circle circle-size dgrey border border-dark border-1 shadow animate__animated animate__bounceIn">
              <a href="#addgoal"><i className="icon-one position-relative top-50 start-50 translate-middle big-icon lgreen-text fas fa-plus"></i></a>
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
