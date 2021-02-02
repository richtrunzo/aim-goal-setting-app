import React from 'react';

export default function Header(props) {
  return (
      <div className="container header">
        <div className="d-flex justify-content-around">
             <div className="text-center">
              <i className="fas fa-home yellow"></i>
            </div>
            <div className="text text-center">
              <h3>AIM</h3>
            </div>
            <div className="text-center">
              <i className="fas fa-cog yellow"></i>
            </div>
        </div>
    </div>
  );
}
