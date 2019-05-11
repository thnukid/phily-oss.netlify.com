import React from 'react';
import axios from 'axios';
import Layout from '../components/layout';
import Card from '../components/card';
import withAuthor from '../components/withAuthor';
import cachedResponse from '../helpers/cacheResponse';

const content_url = 'https://api.github.com/orgs/philips-software/repos';
const UpdatedComponent = withAuthor(Card);

class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = {data: [], loading: true};
  }
  componentWillMount = () => {
    cachedResponse(content_url)
      .then(response => {
        this.setState({data: response.data, loading: false});
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
  render = () => {
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
