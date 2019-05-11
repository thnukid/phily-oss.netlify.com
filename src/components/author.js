import React from 'react';

const Author = props => (
  <div className="card-footer-item has-text-centered">
    <div className="media">
      <div className="media-left">
        <img src={props.author.avatar_url} width="48" alt="" />
      </div>
      <div className="media-content">
        <p className="title is-6">
          <a href={props.author.html_url}>{props.author.login}</a>
        </p>
        <p className="subtitle is-6">
          <small>{props.total} Commits</small> {props.children}
        </p>
      </div>
    </div>
  </div>
);
export default Author;
