import React from 'react';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      account: false,
      username: null,
      password: null
    };
    this.getUser = this.getUser.bind(this);
    this.modalOn = this.modalOn.bind(this);
    this.modalOff = this.modalOff.bind(this);
    this.onChange = this.onChange.bind(this);
    this.signup = this.signup.bind(this);
    this.accountOn = this.accountOn.bind(this);
    this.signin = this.signin.bind(this);
    this.testUser = this.testUser.bind(this);
  }

  testUser() {
    fetch('/api/users', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        const userData = JSON.stringify(data.userId);
        localStorage.setItem('user-information', userData);
        const token = localStorage.getItem('token');
        if (token) {
          localStorage.removeItem('token');
        }
      })
      .then(() => { location.hash = '#home'; });
  }

  getUser() {
    location.hash = '#home';
  }

  signup() {
    if (this.state.username !== null && this.state.password !== null) {
      const user = {
        username: this.state.username,
        password: this.state.password
      };
      fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            username: null,
            password: null,
            modal: false,
            account: true
          });
        });
    }
  }

  signin() {
    if (this.state.username !== null && this.state.password !== null) {
      const user = {
        username: this.state.username,
        nonhashedpassword: this.state.password
      };
      fetch('/api/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(data => {
          const userData = JSON.stringify(data.user.userId);
          localStorage.setItem('user-information', userData);
          localStorage.setItem('token', data.token);
        })
        .then(() => {
          location.hash = '#home';
        });
    }
  }

  onChange() {
    if (event.target.id === 'username') {
      this.setState({ username: event.target.value });
    } else if (event.target.id === 'password') {
      this.setState({ password: event.target.value });
    }
  }

  modalOn() {
    this.setState({
      modal: true,
      account: false
    });
  }

  accountOn() {
    this.setState({
      modal: false,
      account: true
    });
  }

  modalOff() {
    this.setState({
      modal: false,
      account: false
    });
  }

  startrender() {
    return <div>
      <div className="pt-3 pb-3 starting-header border-bottom border-dark border-2 black">
        <h1 className="text text-center lgreen-text">AIM</h1>
      </div>
      <div className="mt-5">
        <p className="text-two text-center">Welcome to AIM<br></br>the app that tracks your goals</p>
      </div>
        <div className="mb-3 d-flex justify-content-center">
          <input type="text" className="bwidth border-0 rounded-start rounded-end" id="username" aria-describedby="emailHelp" placeholder="Username" onChange={this.onChange} />
        </div>
        <div className="mb-3 d-flex justify-content-center">
          <input type="password" className="bwidth border-0 rounded-start rounded-end" id="password" placeholder="Password" onChange={this.onChange} minLength="8" required />
        </div>
          <div className="d-flex justify-content-center">
            <button className="btn-sm lgreen text-demo mt-2 bhalf" onClick={this.signup}>Sign Up</button>
            <button className="btn-sm lgreen text-demo mt-2 bhalf" onClick={this.signin}>Login</button>
          </div>
      <div className="d-flex justify-content-center">
        <button className="btn-sm lgreen text-demo mt-2 bwidth" onClick={this.testUser}>Try it Out!<br></br>No Login Required</button>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn-sm lgreen text-two mt-2 bwidth" onClick={this.modalOn}>About Aim</button>
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
    <div className="filterstart filter-fix">
      <div>
        <div className="d-flex justify-content-center">
          <h2 className="text mt-2">About AIM</h2>
        </div>
          <div className="d-flex justify-content-center">
            <p className="text-center white-text mt-4 big-text">AIM is built to help its users track their goals.<br></br></p>
          </div>
          <div className="d-flex justify-content-center">
          <ul className="mt-3 ms-3">
            <li className="text-four white-text start-text">Click the try it out button to get started</li>
              <li className="text-four white-text start-text">On the home page, click on the plus <span><i className="fas fa-plus lgreen-text"></i></span> icon to add a new goal to the page</li>
              <li className="text-four white-text start-text">Click the gear <span><i className="fas fa-cog lgreen-text"></i></span>  icon in the top right corner of the home page to track your progress, edit your goals, and add notes to your goals</li>
              <li className="text-four white-text  start-text">Goals can be completed once per day, and will refesh on the first login of every day</li>
              <li className="text-four white-text start-text">AIM is built to be mobile-first, for the best experience use a mobile display</li>
          </ul>
        </div>
          <div className="d-flex justify-content-center" >
            <button className="btn-sm lgreen white-text mt-3 text" onClick={this.modalOff}>Go Back</button>
        </div>
      </div>
      </div>
      </>;
  }

  accountRender() {
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
      <div className="filterstart filter-fix">
        <div>
          <div className="d-flex justify-content-center">
            <h2 className="text text-center mt-2">Account Created</h2>
          </div>
          <div className="d-flex justify-content-center">
            <p className="text-center white-text mt-4 big-text">Your account has been successfully created, click the button below to return to the home screen and login.<br></br></p>
          </div>
          <div className="d-flex justify-content-center" >
            <button className="btn-sm lgreen white-text mt-3 text" onClick={this.modalOff}>Login</button>
          </div>
        </div>
      </div>
    </>;
  }

  render() {
    if (this.state.modal === false && this.state.account === false) {
      return this.startrender();
    } else if (this.state.modal === true && this.state.account === false) {
      return this.modalRender();
    } else if (this.state.modal === false && this.state.account === true) {
      return this.accountRender();
    }
  }

}
