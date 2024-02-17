import React from 'react';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';
import Card from '@/components/Card';

const Venue = (props) => (
  <Card id="venue" style={props.style} onCloseArticle={props.onCloseArticle} articleClassName={props.articleClassName}>
    <h2 className="major">A helyszín</h2>
    <span className="image main">
      {/*<StaticImage formats={['auto', 'webp']} src="../../static/assets/villa.jpg" alt="Venue" />*/}
    </span>
  </Card>
);

Venue.propTypes = {
  articleClassName: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
  onCloseArticle: PropTypes.func.isRequired,
};

export default Venue;
