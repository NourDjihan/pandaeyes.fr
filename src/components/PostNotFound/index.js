import React from 'react';


class PostNotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.postId = props.id;
  }

  render() {
    return (
      <center><h2>ERROR: Post "{this.postId}" could not be loaded</h2></center>
    )
  }
}


export default PostNotFoundPage;
