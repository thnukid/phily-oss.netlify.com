import React from 'react';
import Layout from '../components/layout';
import Card from '../components/card';
import withAuthor from '../components/withAuthor';
import cachedResponse from '../helpers/cacheResponse';

const content_url = 'https://api.github.com/orgs/philips-software/repos';
const UpdatedComponent = withAuthor(Card);

class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = {data: [], loading: true, error: false, message_error: ''};
  }
  componentDidMount = () => {
    cachedResponse(content_url)
      .then(response => {
        this.setState({data: response.data, loading: false, error: false});
      })
      .catch((error) => {
        // handle error
        console.log(error);
        this.setState({loading: false, error: true, message_error: error});
      });
  };
  render = () => {
    if(this.state.error) {
      return <Layout><b>Github API says</b> {this.state.message_error}</Layout>;
    }

    if (this.state.loading) {
      return <Layout>Loading</Layout>;
    } else {
      let items = this.state.data.map((item, index) => (
        <UpdatedComponent key={index} data={item} />
      ));
      return <Layout>{items}</Layout>;
    }
  };
}

export default IndexPage;
