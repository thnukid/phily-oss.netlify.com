import React from 'react';

const Card = props => (
  <div className="columns is-multiline">
    <div className="column">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <img src={props.data.owner.avatar_url} width="64" alt="" />
            </div>
            <div className="media-content">
              <p className="title is-4">
                <a href={props.data.html_url} target="_blank">{props.data.description}</a>{' '}
                <span className="tag is-pulled-right is-primary">
                  {props.data.license ? props.data.license.name : 'Undefined'}
                </span>
              </p>
              <p className="subtitle is-6">
                <a href={props.data.html_url} target="_blank">{props.data.full_name}</a>
              </p>
              <span class="tag is-light">
                {props.data.language ? props.data.language : 'Undefined'}
              </span>
            </div>
          </div>
        </div>
        <footer className="card-footer">{props.authors}</footer>
      </div>
    </div>
  </div>
);
export default Card;
