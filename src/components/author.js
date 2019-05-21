import React from 'react';

const Author = props => (
  <div className="card-footer-item has-text-centered">
    <div className="media">
      <div className="media-left">
        <figure className="image is-64x64">
          <img
            src={props.author.avatar_url}
            alt={props.author.login}
            className='is-rounded'
          />
        </figure>
      </div>
      <div className="media-content">
        <p className="title is-6">
          {props.commits} Commits
          <br/>
          <small>by</small>{' '}<a href={props.author.html_url}>{props.author.login}</a>
        </p>
        <p className="subtitle is-6">
          {props.children}
        </p>
      </div>
    </div>
  </div>
);
export default Author;
