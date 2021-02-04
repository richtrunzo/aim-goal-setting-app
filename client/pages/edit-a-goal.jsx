import React from 'react';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: []
    };
    this.noGoalsRender = this.noGoalsRender.bind(this);
    this.goalsRender = this.goalsRender.bind(this);
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
  }

  noGoalsRender() {
    return <div className="mt-5">
            <h3 className="text-center mt-5 text-one">No Goals Saved</h3>
          </div>;
  }

  goalsRender() {
    return <div>
      <div className="d-flex justify-content-between flex-wrap">
        {this.state.goals.map((value, index) => {
          return <div id={value.goalId} key={value.goalId} className="mt-5 col-6">
            <div className="mx-auto circle white border border-dark border-3">
              <i className={`icon-one position-relative top-50 start-50 translate-middle ${value.image}`}></i>
            </div>
            <p className="text-center text-two">{value.goalName}</p>
            <div className="d-flex justify-content-around">
              <button type="button" className=" px-3 btn btn-primary btn-sm orange">Edit</button>
              <button type="button" className="btn btn-primary btn-sm red">Delete</button>
            </div>
          </div>;
        })
        }
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
