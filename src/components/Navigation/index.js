import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

import * as MYSELF from '../../constants/myself';
import * as ROUTES from '../../constants/routes';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrollOnTopOfThePage: true
    };

    // This binding is necessary to make `this` work in the callback
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    let scrollPosition = window.pageYOffset;

    if (this.state.isScrollOnTopOfThePage && scrollPosition > 40) {
      this.setState({
        isScrollOnTopOfThePage: false
      });
    }
    else if (!this.state.isScrollOnTopOfThePage && scrollPosition <= 40) {
      this.setState({
        isScrollOnTopOfThePage: true
      });
    }
  }

  render() {
    return (
      <div id='navbar' class={this.state.isScrollOnTopOfThePage ? 'notFloatingNav' : 'floatingNav'}>
        <div id="navbar-landing">
          <a href={ROUTES.LANDING}>
            <div id='navbar-landing-title'><p>PandaEyes</p></div>
          </a>
        </div>
        <div id='navbar-navigation'>
          <ul>
            <li>
              <Link to={ROUTES.LANDING}>Other Posts</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navigation;
