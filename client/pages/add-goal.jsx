import React from 'react';

export default class Addgoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      image: null,
      name: null
    };
    this.modalOn = this.modalOn.bind(this);
    this.modalOff = this.modalOff.bind(this);
    this.modalRender = this.modalRender.bind(this);
    this.page = this.page.bind(this);
    this.imageRender = this.imageRender.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.postGoal = this.postGoal.bind(this);
  }

  modalOn() {
    this.setState({
      modal: true,
      image: this.state.image
    });
  }

  modalOff() {
    this.setState({
      modal: false,
      image: this.state.image
    });
  }

  imageRender() {
    if (this.state.modal === true) {
      this.setState({
        modal: this.state.modal,
        image: event.target.className
      });
    }
  }

  onHandleChange() {
    this.setState({ name: event.target.value });
    console.log(this.state);
  }

  postGoal() {
    const user = localStorage.getItem('user-information');
    const userData = JSON.parse(user);

    const newGoal = {
      goalName: this.state.name,
      goalImage: this.state.image,
      userId: userData.userId
    };

    fetch('/api/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGoal)
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }

  modalRender() {
    return <>
          <div>
            <div className="input-group input-group-lg mt-5">
              <span className="input-group-text orange" id="inputGroup-sizing-md">Name Your Goal</span>
              <input type="text" className="form-control white" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary orange mt-5" type="button">Pick an Image</button>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary orange mt-5" type="button">Save</button>
            </div>
          </div>
          <div className="filter">
            <h1 className="text orange-text mx-auto ms-3">Pick an Image</h1>
            <div>
              <div className="d-flex justify-content-around mt-5">
                <div>
                  <i className="fas fa-dumbbell icon-one hover" onClick={this.imageRender}></i>
                </div>
                <div>
                  <i className="fas fa-graduation-cap icon-one hover" onClick={this.imageRender}></i>
                </div>
                <div>
                  <i className="fas fa-book icon-one hover" onClick={this.imageRender}></i>
                </div>
                <div>
                  <i className="fas fa-smoking-ban icon-one hover" onClick={this.imageRender}></i>
                </div>
              </div>
              <div className="d-flex justify-content-around mt-5">
                  <div>
                    <i className="fas fa-running icon-one hover" onClick={this.imageRender}></i>
                  </div>
                  <div>
                    <i className="fas fa-bed icon-one hover" onClick={this.imageRender}></i>
                  </div>
                  <div>
                    <i className="fas fa-place-of-worship icon-one hover" onClick={this.imageRender}></i>
                  </div>
                  <div>
                    <i className="fas fa-carrot icon-one hover" onClick={this.imageRender}></i>
                  </div>
              </div>
              <div className="d-flex justify-content-around mt-5">
                    <div>
                      <i className="fas fa-code icon-one hover" onClick={this.imageRender}></i>
                    </div>
                    <div>
                      <i className="fab fa-github icon-one hover" onClick={this.imageRender}></i>
                    </div>
                    <div>
                      <i className="fas fa-pray icon-one hover" onClick={this.imageRender}></i>
                    </div>
                    <div>
                      <i className="fas fa-money-bill-alt icon-one hover" onClick={this.imageRender}></i>
                    </div>
              </div>
              <div className="d-flex justify-content-around mt-5">
                    <div>
                      <i className="fas fa-calendar-check icon-one hover" onClick={this.imageRender}></i>
                    </div>
                    <div>
                      <i className="fas fa-capsules icon-one hover" onClick={this.imageRender}></i>
                    </div>
                    <div>
                      <i className="fas fa-futbol icon-one hover" onClick={this.imageRender}></i>
                    </div>
                    <div>
                      <i className="fas fa-guitar icon-one hover" onClick={this.imageRender}></i>
                    </div>
              </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary orange mt-5" type="button" onClick={this.modalOff}>Save</button>
            </div>
          </div>
        </>;

  }

  page() {
    if (this.state.image !== null) {
      return <div>
              <div className="input-group input-group-lg mt-5">
                <span className="input-group-text orange" id="inputGroup-sizing-md">Name Your Goal</span>
          <input type="text" className="form-control white" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={this.onHandleChange} />
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-primary orange mt-5" type="button" onClick={this.modalOn}>Pick an Image</button>
              </div>
              <div className="col-6 mx-auto text-center mt-5">
                <i className={this.state.image}></i>;
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-primary orange mt-5" type="button" onClick={this.postGoal}>Save</button>
              </div>
            </div>;
    } else {
      return <div>
            <div className="input-group input-group-lg mt-5">
              <span className="input-group-text orange" id="inputGroup-sizing-md">Name Your Goal</span>
          <input type="text" className="form-control white" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={this.onHandleChange}/>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary orange mt-5" type="button" onClick={this.modalOn}>Pick an Image</button>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary orange mt-5" type="button" onClick={this.postGoal}>Save</button>
            </div>
          </div>;
    }
  }

  render() {
    if (this.state.modal === false) {
      return this.page();
    } else {
      return this.modalRender();
    }
  }
}
