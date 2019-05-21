import React from 'react';

const Card = props => (
  <div className="columns is-multiline">
    <div className="column">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-96x96">
                <img
                  src={props.data.owner.avatar_url}
                  alt={props.data.owner.login}
                  className="is-rounded"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">
                <a
                  href={props.data.html_url}
                  target="_blank"
                  rel="noopener noreferrer">
                  {props.data.description}
                </a>{' '}
                {props.data.license && (
                  <span className="tag is-primary">
                    {props.data.license.name}
                  </span>
                )}
              </p>
              <p className="subtitle is-6">
                <a
                  href={props.data.html_url}
                  target="_blank"
                  rel="noopener noreferrer">
                  {props.data.full_name}
                </a>{' '}
                {props.data.language && (
                  <span class="tag is-light">{props.data.language}</span>
                )}
              </p>
            </div>
          </div>
        </div>
        <footer className="card-footer">{props.authors}</footer>
      </div>
    </div>
  </div>
);
export default Card;
