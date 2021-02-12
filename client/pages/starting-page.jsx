import React from 'react';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
  }

  getUser() {
    fetch('/api/users', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        const userData = JSON.stringify(data);
        localStorage.setItem('user-information', userData);
      });
  }

  render() {
    return <div>
      <div className="pt-3 pb-3 starting-header border-bottom border-dark border-2 black">
        <h1 className="text text-center lgreen-text">AIM</h1>
      </div>
      <div className="mt-5">
        <p className="text-two text-center">Welcome to AIM<br></br>the app that tracks your goals</p>
      </div>
      <div>
        <a href="#home"><button className="btn-lg position-absolute top-50 start-50 translate-middle lgreen text" onClick={this.getUser}>Try it out!</button></a>
      </div>
   </div>;
  }
}
