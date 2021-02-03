import React from 'react';

export default class Addgoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.modalOn = this.modalOn.bind(this);
    this.modalOff = this.modalOff.bind(this);
    this.modalRender = this.modalRender.bind(this);
    this.page = this.page.bind(this);
  }

  modalOn() {
    this.setState({ modal: true });
  }

  modalOff() {
    this.setState({ modal: false });
  }

  modalRender() {
    return <>
          <div>
            <div className="input-group input-group-lg mt-5">
              <span className="input-group-text orange" id="inputGroup-sizing-md">Name Your Goal</span>
              <input type="text" className="form-control white" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary orange mt-5" type="button">Pick an Image</button>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary orange mt-5" type="button">Save</button>
            </div>
          </div>
          <div className="filter">
            <h1 className="text orange-text mx-auto ms-3">Pick an Image</h1>
            <div>
              <div className="d-flex justify-content-around mt-5">
                <div>
                  <i className="fas fa-dumbbell icon-one hover"></i>
                </div>
                <div>
                  <i className="fas fa-graduation-cap icon-one hover"></i>
                </div>
                <div>
                  <i className="fas fa-book icon-one hover"></i>
                </div>
                <div>
                  <i className="fas fa-smoking-ban icon-one hover"></i>
                </div>
              </div>
              <div className="d-flex justify-content-around mt-5">
                  <div>
                    <i className="fas fa-running icon-one hover"></i>
                  </div>
                  <div>
                    <i className="fas fa-bed icon-one hover"></i>
                  </div>
                  <div>
                    <i className="fas fa-place-of-worship icon-one hover"></i>
                  </div>
                  <div>
                    <i className="fas fa-carrot icon-one hover"></i>
                  </div>
              </div>
              <div className="d-flex justify-content-around mt-5">
                    <div>
                      <i className="fas fa-code icon-one hover"></i>
                    </div>
                    <div>
                      <i className="fab fa-github icon-one hover"></i>
                    </div>
                    <div>
                      <i className="fab fa-pray icon-one hover"></i>
                    </div>
                    <div>
                      <i className="fas fa-money-bill-alt icon-one hover"></i>
                    </div>
              </div>
              <div className="d-flex justify-content-around mt-5">
                    <div>
                      <i className="fas fa-calendar-check icon-one hover"></i>
                    </div>
                    <div>
                      <i className="fas fa-capsules icon-one hover"></i>
                    </div>
                    <div>
                      <i className="far fa-futbol icon-one hover"></i>
                    </div>
                    <div>
                      <i className="far fa-guitar icon-one hover"></i>
                    </div>
              </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary orange mt-5" type="button">Save</button>
            </div>
          </div>
        </>;

  }

  page() {
    return <div>
            <div className="input-group input-group-lg mt-5">
              <span className="input-group-text orange" id="inputGroup-sizing-md">Name Your Goal</span>
              <input type="text" className="form-control white" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary orange mt-5" type="button">Pick an Image</button>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary orange mt-5" type="button">Save</button>
            </div>
          </div>;
  }

  render() {
    if (this.state.modal === false) {
      return this.page();
    } else {
      return this.modalRender();
    }
  }
}
