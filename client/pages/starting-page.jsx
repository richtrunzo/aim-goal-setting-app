import React from 'react';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.getUser = this.getUser.bind(this);
    this.modalOn = this.modalOn.bind(this);
    this.modalOff = this.modalOff.bind(this);
  }

  componentDidMount() {
    const user = {
      username: 'username',
      password: 'password'
    };

    fetch('/api/newuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json());
  }

  getUser() {
    fetch('/api/users', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        const userData = JSON.stringify(data);
        localStorage.setItem('user-information', userData);
        location.hash = '#home';
      });
  }

  modalOn() {
    this.setState({ modal: true });
  }

  modalOff() {
    this.setState({ modal: false });
  }

  startrender() {
    return <div>
      <div className="pt-3 pb-3 starting-header border-bottom border-dark border-2 black">
        <h1 className="text text-center lgreen-text">AIM</h1>
      </div>
      <div className="mt-5">
        <p className="text-two text-center">Welcome to AIM<br></br>the app that tracks your goals</p>
      </div>
      <div className="d-flex justify-content-center">
        <a href="#home"><button className="btn-lg lgreen text mt-2" onClick={this.getUser}>Try it out!</button></a>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn-lg lgreen text mt-5" onClick={this.modalOn}>About Aim</button>
      </div>
   </div>;
  }

  modalRender() {
    return <>
    <div className="mode"></div>
    <div>
      <div className="pt-3 pb-3 starting-header border-bottom border-dark border-2 black">
        <h1 className="text text-center lgreen-text">AIM</h1>
      </div>
      <div className="mt-5">
        <p className="text-two text-center">Welcome to AIM<br></br>the app that tracks your goals</p>
      </div>
      <div>
       <button className="btn-lg position-absolute top-50 start-50 translate-middle lgreen text" onClick={this.getUser}>Try it out!</button>
      </div>
      <div>
        <button className="btn-lg position-absolute top-50 start-50 translate-middle lgreen text" onClick={this.modalOn}>About AIM</button>
      </div>
   </div>
    <div className="filterstart">
      <div>
        <div className="d-flex justify-content-center">
          <h2 className="text mt-2">About AIM</h2>
        </div>
          <div className="d-flex justify-content-center">
            <p className="text-center lgreen white-text mt-4 big-text">AIM is built to help its users track their goals.<br></br></p>
          </div>
          <div className="d-flex justify-content-center">
          <ul className="lgreen mt-3 ms-3">
            <li className="text-four white-text start-text">Click the try it out button to get started</li>
              <li className="text-four white-text start-text">On the home page, click on the plus icon to add a new goal to the page</li>
              <li className="text-four white-text start-text">Click the gear icon in the top right corner of the home page to track your progress, edit your goals, and add notes to your goals</li>
              <li className="text-four white-text  start-text">Goals can be completed once per day, and will refesh on the first login of every day</li>
              <li className="text-four white-text start-text">Aim is built to be mobile-first, for the best experience use a mobile display</li>
          </ul>
        </div>
          <div className="d-flex justify-content-center" >
            <button className="btn-sm lgrey white-text mt-3 text" onClick={this.modalOff}>Go Back</button>
        </div>
      </div>
      </div>
      </>;

  }

  render() {
    if (this.state.modal === false) {
      return this.startrender();
    } else {
      return this.modalRender();
    }
  }

}
