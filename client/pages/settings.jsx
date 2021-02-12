import React from 'react';

export default function Settings(props) {
  return <>
           <div className="d-grid gap-2 mt-5">
               <button className="btn shadow border border-dark border-1 lgreen dgrey-text settings-btn mt-4 mb-4 mx-auto text-two" type="button"><a className="pe-auto" href="#track">Track Progress</a></button>
           </div>
           <div className="d-grid gap-2 mt-5">
               <button className="btn shadow border border-dark border-1 settings-btn lgreen dgrey-text mt-4 mb-4 mx-auto text-two" type="button"><a className="pe-auto" href="#edit">Edit Goals</a></button>
           </div>
           <div className="d-grid gap-2 mt-5">
               <button className="btn shadow border border-dark border-1 settings-btn lgreen dgrey-text mt-4 mb-4 mx-auto text-two" type="button"><a className="pe-auto" href="#notes">Notes</a></button>
           </div>
           </>;

}
