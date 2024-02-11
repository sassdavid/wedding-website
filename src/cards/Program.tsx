import React from 'react';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';
import Card from '@/components/Card';

const Program = (props) => (
  <Card id="program" style={props.style} onCloseArticle={props.onCloseArticle} articleClassName={props.articleClassName}>
    <h2 className="major">Program</h2>
    <span className="image main">
        <StaticImage formats={['auto', 'webp']} src="../../static/assets/pic03.jpg" alt="Program" />
    </span>
    <p>
      Lorem ipsum dolor sit amet, consectetur et adipiscing elit. Praesent eleifend dignissim arcu, at eleifend
      sapien imperdiet ac. Aliquam erat volutpat. Praesent urna nisi, fringila lorem et vehicula lacinia quam.
      Integer sollicitudin mauris nec lorem luctus ultrices. Aliquam libero et malesuada fames ac ante ipsum primis
      in faucibus. Cras viverra ligula sit amet ex mollis mattis lorem ipsum dolor sit amet.
    </p>
  </Card>
);

Program.propTypes = {
  articleClassName: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
  onCloseArticle: PropTypes.func.isRequired,
};

export default Program;
