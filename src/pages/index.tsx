import React from 'react';
import Layout from '../components/layout';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import SEO from '../components/Seo';
import { StaticImage } from 'gatsby-plugin-image';

class IndexPage extends React.Component<any, any> {

  timeoutId: number | undefined;
  wrapperRef: HTMLElement | null = null;

  constructor(props) {
    super(props);
    this.state = {
      isArticleVisible: false,
      timeout: false,
      articleTimeout: false,
      article: '',
      loading: 'is-loading',
      isVideoVisible: false,
    };
    this.handleOpenArticle = this.handleOpenArticle.bind(this);
    this.handleCloseArticle = this.handleCloseArticle.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount(): void {
    this.timeoutId = setTimeout((): void => {
      this.setState({ loading: '' });
    }, 100);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount(): void {
    if ( this.timeoutId ) {
      clearTimeout(this.timeoutId);
    }
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node): void {
    this.wrapperRef = node;
  }

  handleOpenArticle(article): void {
    const isOpeningProposal: boolean = article === 'proposal';

    this.setState(prevState => ({
      isArticleVisible: !this.state.isArticleVisible,
      article,
      isVideoVisible: isOpeningProposal ? true : prevState.isVideoVisible,
    }));

    // noinspection TypeScriptUnresolvedReference
    if ( typeof window !== 'undefined' && window.dataLayer ) {
      // noinspection TypeScriptUnresolvedReference
      window.dataLayer.push({
        event: 'menu_item_open',
        menuItem: article,
      });
    }

    setTimeout((): void => {
      this.setState({
        timeout: !this.state.timeout,
      });
    }, 325);

    setTimeout((): void => {
      this.setState({
        articleTimeout: !this.state.articleTimeout,
      });
    }, 350);
  }

  handleCloseArticle(): void {
    const isClosingProposal: boolean = this.state.article === 'proposal';

    this.setState(prevState => ({
      articleTimeout: !this.state.articleTimeout,
      isVideoVisible: isClosingProposal ? false : prevState.isVideoVisible,
    }));

    setTimeout((): void => {
      this.setState({
        timeout: !this.state.timeout,
      });
    }, 325);

    setTimeout((): void => {
      this.setState({
        isArticleVisible: !this.state.isArticleVisible,
        article: '',
      });
    }, 350);
  }

  handleClickOutside(event): void {
    if ( this.wrapperRef && event.target.id == 'wrapper' ) {
      if ( this.state.isArticleVisible ) {
        this.handleCloseArticle();
      }
    }
  }

  render() {
    return (
      <Layout>
        <div className={`body ${this.state.loading} ${this.state.isArticleVisible ? 'is-article-visible' : ''}`}>
          <div id="wrapper">
            <Header onOpenArticle={this.handleOpenArticle} timeout={this.state.timeout} />
            <Main
              isArticleVisible={this.state.isArticleVisible}
              timeout={this.state.timeout}
              articleTimeout={this.state.articleTimeout}
              article={this.state.article}
              onCloseArticle={this.handleCloseArticle}
              setWrapperRef={this.setWrapperRef}
              isVideoVisible={this.state.isVideoVisible} />
            <Footer timeout={this.state.timeout} />
          </div>
          <div id="bg">
            <StaticImage id="bg" formats={['auto', 'webp']} src="../../static/assets/bg.jpg" alt="Dimensions Image" />
          </div>
        </div>
      </Layout>
    );
  }
}

export const Head = () => (
  <SEO />
);

export default IndexPage;
