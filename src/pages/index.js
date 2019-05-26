import React from 'react';
import Layout from '../components/layout';
import Card from '../components/card';
import withAuthor from '../components/withAuthor';
import cachedResponse from '../helpers/cacheResponse';

const content_url = 'https://api.github.com/orgs/philips-software/repos';
const CardAuthorComponent = withAuthor(Card);

class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filteredRepos: [],
      repoFilter: null,
      loading: true,
      error: false,
      message_error: '',
    };
  }
  componentDidMount = () => {
    cachedResponse(content_url)
      .then(response => {
        this.setState({
          data: response.data,
          filteredRepos: response.data,
          loading: false,
          error: false,
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
        this.setState({loading: false, error: true, message_error: error});
      });
  };

  mapLanguages = () => {
    return this.state.data
      .map(item => (item.language ? item.language : 'Other'))
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => a.localeCompare(b));
  };
  filterRepos = (repoFilter, event) => {
    let filteredRepos = this.state.data;
    filteredRepos = filteredRepos.filter(repo => {
      let repoLanguage =
        repo.language && repo.language != '' ? repo.language : 'Other';
      return (
        repoLanguage.toLowerCase().indexOf(repoFilter.toLowerCase()) !== -1
      );
    });
    this.setState({
      filteredRepos,
      repoFilter
    });
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
        <div className="level-item has-text-centered">
          <a
            onClick={event => this.filterRepos(language, event)}
            className="button is-rounded is-light is-medium"
            key={index}>
            {language}
          </a>
        </div>
      ));
      let cardAuthorComponent = this.state.filteredRepos.map((item, index) => (
        <CardAuthorComponent key={index} data={item} />
      ));
      return (
        <Layout>
          <p class="subtitle is-4">
            Contributions in {tags.length} programming languages:
          </p>
          <div className="level">{tags}</div>
          <br />
          <p className="subtitle is-4">
            <b>{cardAuthorComponent.length}</b>{' '}
            <span aria-label="tada" role="img">
              🎉
            </span>
            open source software (OSS) projects
          </p>
          {cardAuthorComponent}
        </Layout>
      );
    }
  };
}
export default IndexPage;
