import React from 'react';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.addUser = this.addUser.bind(this);
  }

  addUser() {
    const newUser = {
      username: 'user',
      password: 'password'
    };
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => { console.log(data); });
  }

  render() {
    return <div>
      <div className="pt-3 pb-3 starting-header border-bottom border-dark border-2 orange">
        <h1 className="text text-center">AIM</h1>
      </div>
      <div className="mt-5">
        <p className="text-two text-center">Welcome to AIM<br></br>the app that tracks your goals</p>
      </div>
      <div>
        <a href="#home"><button className="btn-lg yellow position-absolute top-50 start-50 translate-middle orange text" onClick={this.addUser}>Try it out!</button></a>
      </div>
   </div>;
  }
}
