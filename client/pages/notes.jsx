import React from 'react';

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      notes: [],
      addModal: false,
      viewModal: false,
      goalId: null,
      note: null
    };
    this.noGoalsRender = this.noGoalsRender.bind(this);
    this.addModalOn = this.addModalOn.bind(this);
    this.viewModalOn = this.viewModalOn.bind(this);
    this.noteHandler = this.noteHandler.bind(this);
    this.addNote = this.addNote.bind(this);
    this.viewModalOff = this.viewModalOff.bind(this);
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user-information'));
    const userId = parseInt(user.userId);
    fetch(`/api/goals/${userId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        const arr = [...this.state.goals];
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i]);
        }
        this.setState({ goals: arr });
      });

    fetch('api/notes', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        const arr = [...this.state.notes];
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i]);
        }
        this.setState({ notes: arr });
        console.log(this.state.notes);
      });

  }

  addModalOn() {
    this.setState({
      goals: this.state.goals,
      addModal: true,
      viewModal: false,
      goalId: event.target.id,
      note: this.state.note
    });
  }

  noteHandler() {
    this.setState({
      goals: this.state.goals,
      addModal: this.state.addModal,
      viewModal: this.state.viewModal,
      goalId: this.state.goalId,
      note: event.target.value
    });
  }

  addNote() {
    const note = {
      goalId: this.state.goalId,
      note: this.state.note
    };
    fetch('api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
      .then(res => res.json());

    this.setState({
      goals: this.state.goals,
      addModal: false,
      viewModal: false,
      goalId: this.state.goalId,
      note: this.state.note
    });
  }

  viewModalOn() {
    this.setState({
      goals: this.state.goals,
      notes: this.state.notes,
      addModal: false,
      viewModal: true,
      goalId: event.target.id,
      note: this.state.note
    });
  }

  viewModalOff() {
    this.setState({
      goals: this.state.goals,
      notes: this.state.notes,
      addModal: false,
      viewModal: false,
      goalId: event.target.id,
      note: this.state.note
    });
  }

  noGoalsRender() {
    return <div className="mt-5">
      <h3 className="text-center mt-5 text-one">No Goals Saved</h3>
    </div>;
  }

  goalsRender() {
    return <div>
      <div className="d-flex justify-content-between flex-wrap">
        {this.state.goals.map((value, index) => {
          return <div key={value.goalId} className="mt-5 col-6">
            <div className="mx-auto circle white border border-dark border-3">
              <i className={`icon-one position-relative top-50 start-50 translate-middle ${value.image}`}></i>
            </div>
            <p className="text-center text-two">{value.goalName}</p>
            <div className="d-flex justify-content-around">
              <button id={value.goalId} type="button" className=" px-3 btn btn-primary btn-sm orange" onClick={this.addModalOn}>Add Notes</button>
              <button id={value.goalId} type="button" className="btn btn-primary btn-sm green" onClick={this.viewModalOn}>View Notes</button>
            </div>
          </div>;
        })
        }
      </div>
    </div>;

  }

  addModalRender() {
    return <>
          <div className="mode"></div>
          <div>
            <div className="d-flex justify-content-between flex-wrap">
              {this.state.goals.map((value, index) => {
                return <div id={value.goalId} key={value.goalId} className="mt-5 col-6">
              <div className="mx-auto circle white border border-dark border-3">
                <i className={`icon-one position-relative top-50 start-50 translate-middle ${value.image}`}></i>
              </div>
              <p className="text-center text-two">{value.goalName}</p>
              <div className="d-flex justify-content-around">
                <button type="button" className=" px-3 btn btn-primary btn-sm orange">Add Notes</button>
                <button type="button" className="btn btn-primary btn-sm red">View Notes</button>
              </div>
            </div>;
              })
          }
        </div>
      </div>
      <div className="filter">
        <div className="d-flex justify-content-center">
          <h1 className="mt-3 text orange-text">Add a Note</h1>
        </div>
        <div className="d-flex justify-content-center">
          <textarea className="mt-3 textarea" onChange={this.noteHandler}></textarea>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary orange mt-5" type="button" onClick={this.addNote}><a href="#notes">Save</a></button>
        </div>
      </div>
    </>;

  }

  viewNotesRender() {
    console.log(this.state);
    return <>
      <div className="mode"></div>
      <div>
        <div className="d-flex justify-content-between flex-wrap">
          {this.state.goals.map((value, index) => {
            return <div id={value.goalId} key={value.goalId} className="mt-5 col-6">
              <div className="mx-auto circle white border border-dark border-3">
                <i className={`icon-one position-relative top-50 start-50 translate-middle ${value.image}`}></i>
              </div>
              <p className="text-center text-two">{value.goalName}</p>
              <div className="d-flex justify-content-around">
                <button type="button" className=" px-3 btn btn-primary btn-sm orange">Add Notes</button>
                <button type="button" className="btn btn-primary btn-sm red">View Notes</button>
              </div>
            </div>;
          })
          }
        </div>
      </div>
      <div className="filter">
        <div className="d-flex justify-content-center">
          <h1 className="mt-3 text orange-text">Notes</h1>
        </div>
        <div>
          {this.state.notes.map((value, index) => {
            if (parseInt(this.state.goalId) === value.goalId) {
              return <div key={value.noteId}>
                        <p className="text-center text-three orange-text">{value.note}</p>
                     </div>;
            }
          })}
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary orange mt-5" type="button"><a href="#notes" onClick={this.viewModalOff}>Go Back</a></button>
        </div>
      </div>
    </>;

  }

  render() {
    if (this.state.addModal === true && this.state.viewModal === false) {
      return this.addModalRender();
    } else if (this.state.addModal === false && this.state.viewModal === true) {
      return this.viewNotesRender();
    } else {
      return this.goalsRender();
    }

  }
}
