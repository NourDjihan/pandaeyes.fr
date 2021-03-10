import React from 'react';

import './style.css';

import { loadMetadataOfAllPosts } from '../Post';


class PostListPage extends React.Component {
  constructor(props) {
    super(props);
    this.isForDrafts = props.drafts ? true : false;
  }

  render() {
    var postsMetadata = loadMetadataOfAllPosts();

    postsMetadata = postsMetadata.filter(post =>
      post.draft === this.isForDrafts);

    const posts = postsMetadata.map(post =>
      <li><a href={post.id}>{post.title}</a></li>
    );

    return (
      <div>
        <h1>{this.isForDrafts ? 'Drafts' : 'My Posts'}</h1>
        <ul id="list-of-posts">{posts}</ul>
      </div>
    );
  }
}


export default PostListPage;
