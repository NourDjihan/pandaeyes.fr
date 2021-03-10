import React from 'react';

import './style.css';
import arollaLogo from './img/arolla.jpg';


class PostFooter extends React.Component {
  render() {
    return (
      <div id="post-footer">
        <img id="company-logo" src={arollaLogo} alt="" />
        <p>This blog was financed by the <a href="https://www.arolla.fr/">Arolla</a> software company<br/>
        All text and images are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a></p>
    </div>
    );
  }
}

export default PostFooter;
