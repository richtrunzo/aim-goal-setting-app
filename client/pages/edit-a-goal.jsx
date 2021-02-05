import React from 'react';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      editModal: false,
      deleteModal: false,
      goalId: null,
      image: null,
      goalName: null
    };
    this.noGoalsRender = this.noGoalsRender.bind(this);
    this.goalsRender = this.goalsRender.bind(this);
    this.editModalOn = this.editModalOn.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.editGoals = this.editGoals.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteGoals = this.deleteGoals.bind(this);
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

  editModalOn() {
    this.setState({
      goals: this.state.goals,
      editModal: true,
      deleteModal: this.state.deleteModal,
      goalId: event.target.id,
      image: this.state.image,
      goalName: this.state.goalname
    });
  }

  delete() {
    this.setState({
      goals: this.state.goals,
      editModal: this.editModalOn,
      deleteModal: true,
      goalId: event.target.id,
      image: this.state.image,
      goalName: this.state.goalname
    });
    console.log(this.state);

  }

  nameChange() {
    if (this.state.editModal === true) {
      this.setState({
        goals: this.state.goals,
        editModal: this.state.editModal,
        goalId: this.state.goalId,
        image: this.state.image,
        goalName: event.target.value
      });
    }
  }

  imageChange() {
    if (this.state.editModal === true) {
      this.setState({
        goals: this.state.goals,
        editModal: this.state.editModal,
        goalId: this.state.goalId,
        image: event.target.className,
        goalName: this.state.goalName
      });
    }
  }

  editGoals() {
    const goalId = this.state.goalId;
    const editGoal = {
      goalName: this.state.goalName,
      goalImage: this.state.image
    };
    if (this.state.image !== null && this.state.goalName !== null) {
      fetch(`/api/goals/${goalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editGoal)
      })
        .then(res => res.json())
        .then(data => console.log(data));
    }
  }

  deleteGoals() {
    const goalId = this.state.goalId;
    fetch(`/api/delete/${goalId}`, {
      method: 'DELETE'
    })
      .then(res => res.json());
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
              <button id={value.goalId} type="button" className=" px-3 btn btn-primary btn-sm orange" onClick={this.editModalOn}>Edit</button>
              <button id={value.goalId} type="button" className="btn btn-primary btn-sm red" onClick={this.delete}>Delete</button>
            </div>
          </div>;
        })
        }
      </div>
    </div>;

  }

  deleteModalRender() {
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
                          <button type="button" className=" px-3 btn btn-primary btn-sm orange">Edit</button>
                          <button type="button" className="btn btn-primary btn-sm red">Delete</button>
                        </div>
                      </div>;
              })
                        }
        <div className="filter">
           <h1 className="text-two orange-text mt-2 px-5 text-center">Are you sure you want to delete this goal?</h1>
          <div className="d-grid gap-2 mt-5">
              <button className="btn btn-primary settings-btn orange mt-4 mb-4 mx-auto text-two" type="button"><a href="#edit">No, go back</a></button>
          </div>
          <div className="d-grid gap-2 mt-5">
            <button className="btn btn-primary settings-btn orange mt-4 mb-4 mx-auto text-two" type="button" onClick={this.deleteGoals}><a href="#home">Yes, delete</a></button>
          </div>
          </div>
        </div>
      </div>
      </>;
  }

  editModalRender() {
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
                          <button type="button" className=" px-3 btn btn-primary btn-sm orange">Edit</button>
                          <button type="button" className="btn btn-primary btn-sm red">Delete</button>
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
      <div>
        <div className="d-flex justify-content-around mt-3">
          <div>
            <i className="fas fa-dumbbell icon-one hover" onClick={this.imageChange}></i>
          </div>
          <div>
              <i className="fas fa-graduation-cap icon-one hover" onClick={this.imageChange}></i>
          </div>
          <div>
              <i className="fas fa-book icon-one hover" onClick={this.imageChange}></i>
          </div>
          <div>
              <i className="fas fa-smoking-ban icon-one hover" onClick={this.imageChange}></i>
          </div>
        </div>
        <div className="d-flex justify-content-around mt-3">
          <div>
              <i className="fas fa-running icon-one hover" onClick={this.imageChange}></i>
          </div>
          <div>
              <i className="fas fa-bed icon-one hover" onClick={this.imageChange} ></i>
          </div>
          <div>
              <i className="fas fa-place-of-worship icon-one hover" onClick={this.imageChange}></i>
          </div>
          <div>
              <i className="fas fa-carrot icon-one hover" onClick={this.imageChange}></i>
          </div>
        </div>
        <div className="d-flex justify-content-around mt-3">
          <div>
              <i className="fas fa-code icon-one hover" onClick={this.imageChange}></i>
          </div>
          <div>
              <i className="fab fa-github icon-one hover" onClick={this.imageChange}></i>
          </div>
          <div>
              <i className="fas fa-pray icon-one hover" onClick={this.imageChange}></i>
          </div>
          <div>
              <i className="fas fa-money-bill-alt icon-one hover" onClick={this.imageChange}></i>
          </div>
        </div>
        <div className="d-flex justify-content-around mt-3">
          <div>
              <i className="fas fa-calendar-check icon-one hover" onClick={this.imageChange}></i>
          </div>
          <div>
              <i className="fas fa-capsules icon-one hover" onClick={this.imageChange}></i>
          </div>
          <div>
              <i className="fas fa-futbol icon-one hover" onClick={this.imageChange}></i>
          </div>
          <div>
              <i className="fas fa-guitar icon-one hover" onClick={this.imageChange}></i>
          </div>
        </div>
      </div>
      <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary orange mt-5" type="button" onClick={this.editGoals}><a href="#home">Save</a></button>
      </div>
    </div>
    </>;
  }

  render() {
    console.log(this.state);
    if (this.state.goals.length > 0 && this.state.editModal === false && this.state.deleteModal === false) {
      return this.goalsRender();
    } else if (this.state.goals.length > 0 && this.state.editModal === true && this.state.deleteModal === false) {
      return this.editModalRender();
    } else if (this.state.goals.length > 0 && this.state.deleteModal === true) {
      return this.deleteModalRender();
    } else {
      return this.noGoalsRender();
    }
  }
}
