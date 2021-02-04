import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: []
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user-information'));
    const userId = parseInt(user.userId);
    console.log(userId);
    fetch(`/api/goals/${userId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        const arr = [...this.state.goals];
        arr.push(data);
        this.setState({ goals: arr });
        console.log(this.state);
      });
  }
  noGoalsRender() {
    return <div>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="mt-5 col-6">
                <div className="mx-auto circle white border border-dark border-3">
                  <a href="#addgoal"><i className="icon-one position-relative top-50 start-50 translate-middle fas fa-plus"></i></a>
                </div>
              </div>
            </div>
          </div>
  }
  goalsRender() {
    return this.state.goals.map((value, index) => {
      <div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="mt-5 col-6">
          <div className="mx-auto circle white border border-dark border-3">
            <a href="#addgoal"><i className="icon-one position-relative top-50 start-50 translate-middle fas fa-plus"></i></a>
          </div>
        </div>
     </div>
    </div>
      <div>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="mt-5 col-6">
            <div className="mx-auto circle white border border-dark border-3">
              <a href="#addgoal"><i className="icon-one position-relative top-50 start-50 translate-middle fas fa-plus"></i></a>
            </div>
          </div>
        </div>
      </div>

    })
  }

  render() {
    return (
    <div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="mt-5 col-6">
          <div className="mx-auto circle white border border-dark border-3">
            <a href="#addgoal"><i className="icon-one position-relative top-50 start-50 translate-middle fas fa-plus"></i></a>
          </div>
        </div>
        <div className="mt-5 col-6">
          <div className="mx-auto circle white border border-dark border-3">
            <a href="#addgoal"><i className="icon-one position-relative top-50 start-50 translate-middle fas fa-plus"></i></a>
          </div>
        </div>
     </div>
    </div>
    );
  }
}
