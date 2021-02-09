import React from 'react';

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      addModal: false,
      viewModal: false,
      goalId: null
    };
    this.noGoalsRender = this.noGoalsRender.bind(this);
    this.addModalOn = this.addModalOn.bind(this);
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
  }

  addModalOn() {
    this.setState({
      goals: this.state.goals,
      addModal: true,
      viewModal: false,
      goalId: event.target.id,
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
          return <div key={value.goalId} className="mt-5 col-6">
            <div className="mx-auto circle white border border-dark border-3">
              <i className={`icon-one position-relative top-50 start-50 translate-middle ${value.image}`}></i>
            </div>
            <p className="text-center text-two">{value.goalName}</p>
            <div className="d-flex justify-content-around">
              <button id={value.goalId} type="button" className=" px-3 btn btn-primary btn-sm orange" onClick={this.addModalOn}>Add Notes</button>
              <button id={value.goalId} type="button" className="btn btn-primary btn-sm red" onClick={}>View Notes</button>
            </div>
          </div>;
        })
        }
      </div>
    </div>;

  }

  addModalRender() {
    return <>
      <div className="mode"></div>
      <div>
        <div className="d-flex justify-content-between flex-wrap">
          {this.state.goals.map((value, index) => {
            return <div id={value.goalId} key={value.goalId} className="mt-5 col-6">
              <div className="mx-auto circle white border border-dark border-3">
                <i className={`icon-one position-relative top-50 start-50 translate-middle ${value.image}`}></i>
              </div>
              <p className="text-center text-two">{value.goalName}</p>
              <div className="d-flex justify-content-around">
                <button type="button" className=" px-3 btn btn-primary btn-sm orange">Add Notes</button>
                <button type="button" className="btn btn-primary btn-sm red">View Notes</button>
              </div>
            </div>;
          })
          }
        </div>
      </div>
      <div className="filter">
        <div>
          <div className="input-group input-group-lg mt-3">
            <span className="input-group-text text orange white-text" id="inputGroup-sizing-md">Edit Goal</span>
            <input type="text" className="form-control white" aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg" onChange={this.nameChange} />
          </div>
        </div>
        <h1 className="text orange-text mx-auto ms-3">Pick an Image</h1>

        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary orange mt-5" type="button" onClick={this.editGoals}><a href="#home">Save</a></button>
        </div>
      </div>
    </>;
  }

  render() {

}
