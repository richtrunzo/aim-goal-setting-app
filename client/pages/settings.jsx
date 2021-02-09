import React from 'react';

export default function Settings(props) {
  return <>
           <div className="d-grid gap-2 mt-5">
              <button className="btn btn-primary settings-btn orange mt-5 mb-5 mx-auto text-two" type="button"><a href="#track">Track Progress</a></button>
           </div>
           <div className="d-grid gap-2 mt-5">
              <button className="btn btn-primary settings-btn orange mt-5 mb-5 mx-auto text-two" type="button"><a href="#edit">Edit Goals</a></button>
           </div>
           <div className="d-grid gap-2 mt-5">
            <button className="btn btn-primary settings-btn orange mt-5 mb-5 mx-auto text-two" type="button"><a href="#notes">Notes</a></button>
           </div>
           </>;

}
