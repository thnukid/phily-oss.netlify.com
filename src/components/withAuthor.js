import React from 'react';
import Author from './author';
import cachedResponse from '../helpers/cacheResponse';

const LOCAdded = props => (
  <small className="has-text-success">{props.added}++</small>
);
const LOCDeleted = props => (
  <small className="has-text-danger">{props.deleted}--</small>
);
const withAuthor = BaseComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {authors: null, loading: true};
    }

    componentDidMount = props => {
      const authors_url = [this.props.data.url, 'stats/contributors'].join('/');
      cachedResponse(authors_url)
        .then(response => {
          if(!response) {
            this.setState({loading: true});
          } else {
            let author_items = [].slice.call(response.data).sort(
              (a, b) => b.total - a.total,
            );
            this.setState({authors: author_items, loading: false});
          }
        })
        .catch(error => {
          this.setState({loading: true});
          console.log(error);
        });
    };

    render() {
      if (this.state.loading) {
        return <BaseComponent {...this.props} />;
      }

      let authors = this.state.authors.map((item, index) => (
        <Author key={index} author={item.author} commits={item.total}>
          <LOCAdded
            added={item.weeks
              .map(item => item.a)
              .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0,
              )}
          />{' '}
          <LOCDeleted
            deleted={item.weeks
              .map(item => item.d)
              .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0,
              )}
          />
        </Author>
      ));

      return <BaseComponent authors={authors} {...this.props} />;
    }
  };
};
export default withAuthor;
