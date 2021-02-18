import React from 'react';

export default function Settings(props) {
  return <>
           <div className="d-grid gap-2 mt-5">
          <a className="pe-auto d-grid gap-2" href="#track"><button className="btn shadow border border-dark border-1 lgreen dgrey-text settings-btn mt-4 mb-4 mx-auto text-two width" type="button">Track Progress</button></a>
           </div>
           <div className="d-grid gap-2 mt-5">
                <a className="pe-auto d-grid gap-2" href="#edit"><button className="btn shadow border border-dark border-1 settings-btn lgreen dgrey-text mt-4 mb-4 mx-auto text-two width" type="button">Edit Goals</button></a>
           </div>
           <div className="d-grid gap-2 mt-5">
          <a className="pe-auto d-grid gap-2" href="#notes"><button className="btn shadow border border-dark border-1 settings-btn lgreen dgrey-text mt-4 mb-4 mx-auto text-two width" type="button">Notes</button></a>
           </div>
           </>;

}
