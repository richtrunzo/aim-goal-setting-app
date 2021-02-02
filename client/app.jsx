import React from 'react';
import Home from './pages/home';
import Header from './components/header';
import Start from './pages/starting-page';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    console.log(this.state);
  }

  renderPage() {
    if (this.state.route.path === '') {
      console.log(this.state);
      return <Start />;
    } else if (this.state.route.path === 'home') {
      return <>
              <Header />
              <Home />;
            </>;
    }
  }

  render() {
    console.log(this.state);
    return (
      <React.Fragment >
        {this.renderPage()}
      </React.Fragment >
    );
  }
}
