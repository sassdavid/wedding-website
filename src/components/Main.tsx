import React from 'react';
import PropTypes from 'prop-types';
import Intro from '@/cards/Intro';
import Work from '@/cards/Work';
import About from '@/cards/About';
import Rsvp from '@/cards/Rsvp';

const Main = props => (
  <div ref={props.setWrapperRef} id="main" style={props.timeout ? { display: 'flex' } : { display: 'none' }}>
    <Intro articleClassName={`${props.article === 'intro' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}
           onCloseArticle={props.onCloseArticle} />

    <Work articleClassName={`${props.article === 'work' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}
          onCloseArticle={props.onCloseArticle} />

    <About articleClassName={`${props.article === 'about' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}
           onCloseArticle={props.onCloseArticle} />

    <Rsvp articleClassName={`${props.article === 'contact' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`}
          style={{ display: 'none' }}
          onCloseArticle={props.onCloseArticle} />
  </div>
);

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  timeout: PropTypes.bool,
  setWrapperRef: PropTypes.func.isRequired,
};

export default Main;
