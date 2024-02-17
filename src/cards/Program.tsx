import React from 'react';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';
import Card from '@/components/Card';

const Program = (props) => (
  <Card id="program" style={props.style} onCloseArticle={props.onCloseArticle} articleClassName={props.articleClassName}>
    <h2 className="major">Program</h2>
    <span className="image main">
      <StaticImage formats={['auto', 'webp']} src="../../static/assets/program.png" alt="Program" />
    </span>
  </Card>
);

Program.propTypes = {
  articleClassName: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
  onCloseArticle: PropTypes.func.isRequired,
};

export default Program;
