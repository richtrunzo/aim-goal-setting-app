import React from 'react';

export default function Start(props) {
  return (
    <div>
      <div className="pt-3 pb-3 starting-header border-bottom border-dark border-2 orange">
        <h1 className="text text-center">AIM</h1>
      </div>
      <div className="mt-5">
        <p className="text-two text-center">Welcome to AIM<br></br>the app that tracks your goals</p>
      </div>
      <div>
          <button className="btn-lg yellow position-absolute top-50 start-50 translate-middle orange text">Try it out!</button>
      </div>
   </div>
  );
}
