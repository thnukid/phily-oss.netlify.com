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
      .catch(error => {
        // handle error
        console.log(error);
        this.setState({loading: false, error: true, message_error: error});
      });
  };

  mapLanguages = () => {
    return this.state.data
      .map(item => item.language)
      .filter((v, i, a) => a.indexOf(v) === i);
  };
  mapLicenses = () => {
    return this.state.data
      .map(item => item.license)
      .filter((v, i, a) => a.indexOf(v) === i);
  };
  render = () => {
    if (this.state.error) {
      return (
        <Layout>
          <b>Github API says</b> {this.state.message_error}
        </Layout>
      );
    }

    if (this.state.loading) {
      return <Layout>Loading</Layout>;
    } else {
      let tags = this.mapLanguages().map((language, index) => (
        <div class="level-item has-text-centered">
          <span className="tag is-light is-medium" key={index}>
            {language}
          </span>
        </div>
      ));
      let licenses = this.mapLicenses().map((item, index) => (
        item && <p key={index}>{item.name}</p>
      ));
      let items = this.state.data.map((item, index) => (
        <UpdatedComponent key={index} data={item} />
      ));
      return (
        <Layout>
          <h1 class="title is-6">
            Contributions in {tags.length} programming languages:
          </h1>
          <div class="level">{tags}</div>
          <br />
          <h1 class="title is-6">
            🎉 <b>{items.length}</b> open source software (OSS) projects
          </h1>
          {items}
        </Layout>
      );
    }
  };
}
export default IndexPage;
