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
      note: null,
      errormodal: false
    };
    this.noGoalsRender = this.noGoalsRender.bind(this);
    this.addModalOn = this.addModalOn.bind(this);
    this.viewModalOn = this.viewModalOn.bind(this);
    this.noteHandler = this.noteHandler.bind(this);
    this.addNote = this.addNote.bind(this);
    this.viewModalOff = this.viewModalOff.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
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
      });

  }

  addModalOn() {
    this.setState({
      goals: this.state.goals,
      notes: this.state.notes,
      addModal: true,
      viewModal: false,
      goalId: event.target.id,
      note: this.state.note,
      errormodal: false
    });
  }

  noteHandler() {
    this.setState({
      goals: this.state.goals,
      notes: this.state.notes,
      addModal: this.state.addModal,
      viewModal: this.state.viewModal,
      goalId: this.state.goalId,
      note: event.target.value,
      errormodal: this.state.errormodal
    });
  }

  addNote() {
    if (this.state.note === null) {
      this.setState({
        goals: this.state.goals,
        notes: this.state.notes,
        addModal: false,
        viewModal: false,
        goalId: this.state.goalId,
        note: null,
        errormodal: true
      });
    } else {
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
        .then(res => res.json())
        .then(fetch('api/notes', { method: 'GET' })
          .then(res => res.json())
          .then(data => {
            this.setState({ notes: data });
          })
        );

      this.setState({
        goals: this.state.goals,
        notes: [],
        addModal: false,
        viewModal: false,
        goalId: this.state.goalId,
        note: this.state.note
      });

    }
  }

  viewModalOn() {
    this.setState({
      goals: this.state.goals,
      notes: this.state.notes,
      addModal: false,
      viewModal: true,
      goalId: event.target.id,
      note: this.state.note,
      errormodal: false
    });
  }

  viewModalOff() {
    this.setState({
      goals: this.state.goals,
      notes: this.state.notes,
      addModal: false,
      viewModal: false,
      goalId: event.target.id,
      note: this.state.note,
      errormodal: false
    });
  }

  deleteNote() {
    const noteId = event.target.id;

    fetch(`/api/deletenote/${noteId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        fetch('api/notes', { method: 'GET' })
          .then(res => res.json())
          .then(data => {
            this.setState({
              goals: this.state.goals,
              notes: data,
              addModal: false,
              viewModal: false,
              goalId: this.state.goalId,
              note: this.state.note,
              errormodal: false
            });
          });
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
            <div className="mx-auto circle dgrey border border-dark border-3">
              <i className={`icon-one position-relative top-50 start-50 translate-middle lgreen-text ${value.image}`}></i>
            </div>
            <p className="text-center text-two">{value.goalName}</p>
            <div className="d-flex justify-content-around">
              <button id={value.goalId} type="button" className="btn btn-sm lgreen white-text center-margin-left" onClick={this.addModalOn}>Add Notes</button>
              <button id={value.goalId} type="button" className="btn btn-sm dgrey white-text center-margin-right" onClick={this.viewModalOn}>View Notes</button>
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
              <div className="mx-auto circle dgrey border border-dark border-3">
                <i className={`icon-one position-relative top-50 start-50 translate-middle lgreen-text ${value.image}`}></i>
              </div>
              <p className="text-center text-two">{value.goalName}</p>
              <div className="d-flex justify-content-around">
                <button type="button" className="btn btn-sm lgreen white-text">Add Notes</button>
                <button type="button" className="btn btn-sm dgrey white-text">View Notes</button>
              </div>
            </div>;
              })
          }
        </div>
      </div>
      <div className="filter edit-fix">
        <div className="d-flex justify-content-center">
          <h1 className="mt-3 text lgreen-text">Add a Note</h1>
        </div>
        <div className="d-flex justify-content-center">
          <textarea className="mt-3 textarea" onChange={this.noteHandler}></textarea>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn lgreen white-text mt-5" type="button" onClick={this.addNote}>Save</button>
        </div>
      </div>
    </>;

  }

  viewNotesRender() {
    return <>
      <div className="mode"></div>
      <div>
        <div className="d-flex justify-content-between flex-wrap">
          {this.state.goals.map((value, index) => {
            return <div id={value.goalId} key={value.goalId} className="mt-5 col-6">
              <div className="mx-auto circle dgrey border border-dark border-3">
                <i className={`icon-one position-relative top-50 start-50 translate-middle ${value.image}`}></i>
              </div>
              <p className="text-center text-two">{value.goalName}</p>
              <div className="d-flex justify-content-around">
                <button type="button" className="btn btn-sm lgreen white-text center-margin-left">Add Notes</button>
                <button type="button" className="btn btn-sm dgrey white-text center-margin-right">View Notes</button>
              </div>
            </div>;
          })
          }
        </div>
      </div>
      <div className="filter">
        <div className="d-flex justify-content-center">
          <h1 className="mt-3 text lgreen-text">Notes</h1>
        </div>
        <div>
          {this.state.notes.map((value, index) => {
            if (parseInt(this.state.goalId) === value.goalId) {
              return <div key={value.noteId} className="d-flex justify-content-around">
                <p className="text-center text-three dgrey white-text border border-dark note">{value.note}</p>
                <i id={value.noteId} onClick={this.deleteNote} className="mt-2 dgreen-text fas fa-trash-alt"></i>
                     </div>;
            }
          })}
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn lgreen white-text mt-5" type="button" onClick={this.viewModalOff}>Go Back</button>
        </div>
      </div>
    </>;

  }

  errorRender() {
    return <>
      <div className="mode"></div>
      <div>
        <div className="d-flex justify-content-between flex-wrap">
          {this.state.goals.map((value, index) => {
            return <div id={value.goalId} key={value.goalId} className="mt-5 col-6">
              <div className="mx-auto circle dgrey border border-dark border-3">
                <i className={`icon-one position-relative top-50 start-50 translate-middle ${value.image}`}></i>
              </div>
              <p className="text-center text-two">{value.goalName}</p>
              <div className="d-flex justify-content-around">
                <button type="button" className="btn btn-sm lgreen white-text">Add Notes</button>
                <button type="button" className="btn btn-sm dgrey white-text">View Notes</button>
              </div>
            </div>;
          })
          }
        </div>
      </div>
      <div className="errorfilter">
        <div className="d-flex justify-content-center">
          <h1 className="mt-3 text-center text-two red-text">Note field must be complete</h1>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn lgreen white-text mt-5" type="button" onClick={this.viewModalOff}>Try Again</button>
        </div>
      </div>
    </>;

  }

  render() {
    if (this.state.addModal === true && this.state.viewModal === false && this.state.errormodal === false) {
      return this.addModalRender();
    } else if (this.state.addModal === false && this.state.viewModal === true && this.state.errormodal === false) {
      return this.viewNotesRender();
    } else if (this.state.addModal === false && this.state.viewModal === false && this.state.errormodal === true) {
      return this.errorRender();
    } else if (this.state.addModal === false && this.state.viewModal === false && this.state.errormodal === false && this.state.goals.length > 0) {
      return this.goalsRender();
    } else {
      return this.noGoalsRender();
    }
  }
}
