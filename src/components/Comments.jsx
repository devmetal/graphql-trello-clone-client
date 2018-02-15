import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import CommentType from '../types/Comment';

class Comments extends Component {
  static propTypes = {
    comments: PropTypes.arrayOf(CommentType),
  };

  static defaultProps = {
    comments: [],
  };

  render() {
    const { comments } = this.props;

    if (!comments.length) {
      return <div>No comments yet</div>
    }

    return (
      <div>
        {comments.map((comment =>
          <Comment key={comment.id} {...comment} />)
        )}
      </div>
    )
  }
}

export default Comments;
