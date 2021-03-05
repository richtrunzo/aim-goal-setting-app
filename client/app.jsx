import React from 'react';
import Home from './pages/home';
import Header from './components/header';
import Start from './pages/starting-page';
import Addgoal from './pages/add-goal';
import Settings from './pages/settings';
import Edit from './pages/edit-a-goal';
import Track from './pages/track-progress';
import Notes from './pages/notes';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('token');
    const userId = window.localStorage.getItem('user-information');
    if (token) {
      this.setState({ user: decodeToken(token) });
    } else if (userId === '1') {
      this.setState({ user: 'test' });
    } else {
      this.setState({ user: null });
    }
  }

  renderPage() {
    if (this.state.route.path === '') {
      return <Start />;
    } else
    if (this.state.route.path === 'home') {
      return <>
              <Header />
              <Home />
            </>;
    } else if (this.state.route.path === 'addgoal') {
      return <>
              <Header />
              <Addgoal />
             </>;
    } else if (this.state.route.path === 'settings') {
      return <>
             <Header />
             <Settings />
             </>;
    } else if (this.state.route.path === 'edit') {
      return <>
              <Header />
              <Edit />
              </>;
    } else if (this.state.route.path === 'track') {
      return <>
              <Header />
              <Track />
            </>;
    } else if (this.state.route.path === 'notes') {
      return <>
        <Header />
        <Notes />
      </>;
    }
  }

  render() {
    if (this.state.user === null) {
      return <Start />;
    } else {
      return (
      <React.Fragment >
        {this.renderPage()}
      </React.Fragment >
      );
    }
  }
}
