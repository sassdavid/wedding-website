import React from 'react';
import PropTypes from 'prop-types';
import Invitation from '@/cards/Invitation';
import Venue from '@/cards/Venue';
import Program from '@/cards/Program';
import Rsvp from '@/cards/Rsvp';
import Proposal from '@/cards/Proposal';
import SeatingChart from '@/cards/SeatingChart';
import Menu from '@/cards/Menu';

const Main = props => (
  <div ref={props.setWrapperRef} id="main" style={props.timeout ? { display: 'flex' } : { display: 'none' }}>
    <Invitation articleClassName={`${props.article === 'invitation' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`}
                style={{ display: 'none' }}
                onCloseArticle={props.onCloseArticle} />

    <Venue articleClassName={`${props.article === 'venue' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}
           onCloseArticle={props.onCloseArticle} />

    <Program articleClassName={`${props.article === 'program' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}
             onCloseArticle={props.onCloseArticle} />

    <Proposal articleClassName={`${props.article === 'proposal' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`}
              style={{ display: 'none' }}
              onCloseArticle={props.onCloseArticle} />

    <SeatingChart articleClassName={`${props.article === 'seatingchart' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`}
                  style={{ display: 'none' }}
                  onCloseArticle={props.onCloseArticle} />

    <Menu articleClassName={`${props.article === 'menu' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}
          onCloseArticle={props.onCloseArticle} />

    <Rsvp articleClassName={`${props.article === 'rsvp' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}
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
