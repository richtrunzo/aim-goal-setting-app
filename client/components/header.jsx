import React from 'react';

export default function Header(props) {
  return (
      <div className="header black">
        <div className="d-flex justify-content-around">
             <div className="text-center">
              <a href="#home"><i className="fas fa-home dgreen-text icon-head pt-2"></i></a>
            </div>
            <div className="text text-center">
              <h3 className="text lgreen-text">AIM</h3>
            </div>
            <div className="text-center">
              <a href="#settings"><i className="fas fa-cog dgreen-text icon-head pt-2"></i></a>
            </div>
        </div>
    </div>
  );
}
