import React from 'react';

export default class Addgoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      errormodal: false,
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
    this.errormodalOff = this.errormodalOff.bind(this);
  }

  modalOn() {
    this.setState({
      modal: true,
      errormodal: false,
      image: this.state.image,
      name: this.state.name
    });
  }

  modalOff() {
    this.setState({
      modal: false,
      errormodal: false,
      image: this.state.image,
      name: this.state.name
    });
  }

  errormodalOff() {
    this.setState({
      modal: false,
      errormodal: false,
      image: null,
      name: null
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
  }

  postGoal() {
    if (this.state.image === null || this.state.name === null) {
      this.setState({
        modal: false,
        errormodal: true,
        image: this.state.image,
        name: this.state.name
      });
    } else {
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
        .then(res => res.json());
    }
  }

  modalRender() {
    return <>
      <div className="mode"></div>
          <div>
            <div className="input-group input-group-lg mt-5">
              <span className="input-group-text dgreen white-text" id="inputGroup-sizing-md">Name Your Goal</span>
              <input type="text" className="form-control white" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary lgreen-text mt-5" type="button">Pick an Image</button>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn dgreen white-text mt-5" type="button">Save</button>
            </div>
          </div>
          <div className="filter">
            <h1 className="text lgreen-text mx-auto ms-3">Pick an Image</h1>
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
              <button className="btn dgreen white-text mt-5" type="button" onClick={this.modalOff}>Save</button>
            </div>
          </div>
        </>;

  }

  page() {
    if (this.state.image !== null && this.state.name !== null) {
      return <div>
              <div className="input-group input-group-lg mt-5">
                <span className="input-group-text dgreen white-text" id="inputGroup-sizing-md">Name Your Goal</span>
          <input type="text" className="form-control white-text" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={this.onHandleChange} />
              </div>
              <div className="col-6 mx-auto text-center mt-5">
                <p className="text-center lgreen-text text">{this.state.name}</p>
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn dgreen white-text mt-5" type="button" onClick={this.modalOn}>Pick an Image</button>
              </div>
              <div className="col-6 mx-auto text-center mt-5">
                <i className={this.state.image}></i>
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn dgreen white-text mt-5" type="button" onClick={this.postGoal}><a href="#home">Save</a></button>
              </div>
            </div>;
    } else if (this.state.image !== null && this.state.name === null) {
      return <div>
        <div className="input-group input-group-lg mt-5">
          <span className="input-group-text dgreen white-text" id="inputGroup-sizing-md">Name Your Goal</span>
          <input type="text" className="form-control white-text" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={this.onHandleChange} />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn dgreen white-text mt-5" type="button" onClick={this.modalOn}>Pick an Image</button>
        </div>
        <div className="col-6 mx-auto text-center mt-5">
          <i className={this.state.image}></i>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn dgreen white-text mt-5" type="button" onClick={this.postGoal}>Save</button>
        </div>
      </div>;
    } else {
      return <div>
            <div className="input-group input-group-lg mt-5">
              <span className="input-group-text dgreen white-text" id="inputGroup-sizing-md">Name Your Goal</span>
          <input type="text" className="form-control white-text" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={this.onHandleChange}/>
            </div>
            <div className="col-6 mx-auto text-center mt-5">
              <p className="text-center lgreen-text text">{this.state.name}</p>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn dgreen white-text mt-5" type="button" onClick={this.modalOn}>Pick an Image</button>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn dgreen white-text mt-5" type="button" onClick={this.postGoal}>Save</button>
            </div>
          </div>;
    }
  }

  errorRender() {
    return <>
    <div className="mode"></div>
          <div>
            <div className="input-group input-group-lg mt-5">
              <span className="input-group-text dgreen white-text" id="inputGroup-sizing-md">Name Your Goal</span>
              <input type="text" className="form-control white" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary lgreen-text mt-5" type="button">Pick an Image</button>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn dgreen white-text mt-5" type="button">Save</button>
            </div>
          </div>
          <div className="errorfilter">
            <div className="d-flex justify-content-center">
              <h1 className="mt-3 text-center text-two red-text px-2">Name field must be complete and an image must be chosen</h1>
            </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn dgreen white-text mt-5" type="button"><a href="#addgoal" onClick={this.errormodalOff}>Try Again</a></button>
        </div>
      </div>
    </>;
  }

  render() {
    if (this.state.modal === false && this.state.errormodal === false) {
      return this.page();
    } else if (this.state.modal === true && this.state.errormodal === false) {
      return this.modalRender();
    } else if (this.state.modal === false && this.state.errormodal === true) {
      return this.errorRender();
    }
  }
}
