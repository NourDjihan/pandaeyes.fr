import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import math from 'remark-math';
import Tex from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import $ from "jquery";

import './style.css';
import * as URLS from '../../constants/blogUrls';

import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
import PostNotFoundPage from '../PostNotFound';

const getContentsOfFileFromURL = url => {
  var result = null;
  $.ajax({
    url: url,
    type: 'get',
    dataType: 'text',
    async: false,
    success: function(data) {
      result = data;
    }
  });
  return result;
}

const getJsonFromURL = url =>
  JSON.parse(getContentsOfFileFromURL(url));

const loadPostMarkdown = postId =>
  getContentsOfFileFromURL(URLS.POSTS_FOLDER + `/${postId}/index.md`);

const loadPostMetadata = postId =>
  loadMetadataOfAllPosts().find(post => post.id === postId);

const loadMetadataOfAllPosts = () =>
  getJsonFromURL(URLS.POSTS_METADATA_FILE);


class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.match.params.postId;
    console.log(`Displaying post ${this.id}`);
  }

  preprocessPostMarkdown(markdown) {
    markdown = this.removeFirstHeader(markdown);
    markdown = this.fixRelativeImagePaths(markdown);
    return markdown;
  }

  removeFirstHeader(html) {
    // First # header is a title of the post. We will replace it with our own
    // custom title block - with title, date, author, etc.
    return html.replace(/^#\s(.+)/, '');
  }

  fixRelativeImagePaths(markdown) {
    return markdown.replace(/(!\[.*?\]\()/g, `$1${URLS.POSTS_FOLDER}/${this.id}/`);
  }

  render() {
    const metadata = loadPostMetadata(this.id);

    if (metadata === undefined)
      return <PostNotFoundPage id={this.id} />;

    var markdown = loadPostMarkdown(this.id);
    markdown = this.preprocessPostMarkdown(markdown);

    const renderers = {
      inlineMath: ({value}) => <Tex math={value} />,
      math: ({value}) => <Tex block math={value} />,
      code: ({language, value}) => {
        return <SyntaxHighlighter style={prism} language={language.toLowerCase()} children={value} />
      }
    };

    return(
      <div>
        <PostHeader title={metadata.title} date={metadata.datePublished} />
        <div id='post'>
          <ReactMarkdown plugins={[math,gfm]} renderers={renderers} children={markdown} />
        </div>
        <PostFooter />
      </div>
    )
  }
}

export { loadMetadataOfAllPosts };
export default PostPage;
