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
      this.state = {data: [], loading: true};
    }

    componentDidMount = props => {
      const authors_url = [this.props.data.url, 'stats/contributors'].join('/');
      cachedResponse(authors_url)
        .then(response => {
          this.setState({authors: response.data, loading: false});
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    };

    render() {
      if (this.state.loading) {
        return <div>retrieving authors</div>;
      } else {
        let author_items = this.state.authors
          .sort((a, b) => b.total - a.total)
          .map((item, index) => (
            <Author key={index} author={item.author}>
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

        return <BaseComponent authors={author_items} {...this.props} />;
      }
    }
  };
};
export default withAuthor;
