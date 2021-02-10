import React from 'react';

export default function Header(props) {
  return (
      <div className="container header black">
        <div className="d-flex justify-content-around">
             <div className="text-center">
              <a href="#home"><i className="fas fa-home dblue-text icon-head pt-2"></i></a>
            </div>
            <div className="text text-center">
              <h3 className="text lblue-text">AIM</h3>
            </div>
            <div className="text-center">
              <a href="#settings"><i className="fas fa-cog dblue-text icon-head pt-2"></i></a>
            </div>
        </div>
    </div>
  );
}
