import React from 'react';

function Logout(props) {
  const userId = localStorage.getItem('user-information');
  const token = localStorage.getItem('token');

  if (token) {
    localStorage.removeItem('token');
  }

  if (userId) {
    localStorage.removeItem('user-information');
  }

  location.hash = '#';

}

export default function Header(props) {
  return (
      <div className="header black">
        <div className="d-flex justify-content-around">
             <div className="text-center">
              <a href="#home"><i className="fas fa-home dgreen-text icon-head pt-2"></i></a>
            </div>
            <div className="text text-center">
              <h3 className="text lgreen-text ps-4">AIM</h3>
            </div>
            <div className="text-center">
              <a href="#settings"><i className="fas fa-cog dgreen-text icon-head pt-2"></i></a>
              <i className="fas fa-sign-out-alt dgreen-text icon-head ps-2" onClick={Logout}></i>
            </div>
        </div>
    </div>
  );
}
