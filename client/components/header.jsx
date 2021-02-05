import React from 'react';

export default function Header(props) {
  return (
      <div className="container header white">
        <div className="d-flex justify-content-around">
             <div className="text-center">
              <a href="#home"><i className="fas fa-home orange-text icon-two pt-3"></i></a>
            </div>
            <div className="text text-center">
              <h3 className="text orange-text">AIM</h3>
            </div>
            <div className="text-center">
              <a href="#settings"><i className="fas fa-cog orange-text icon-two pt-3"></i></a>
            </div>
        </div>
    </div>
  );
}
