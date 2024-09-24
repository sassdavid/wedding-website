import React from 'react';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';
import Card from '@/components/Card';

const Menu = (props) => (
  <Card id="Menu" style={props.style} onCloseArticle={props.onCloseArticle} articleClassName={props.articleClassName}>
    <h2 className="major">Menü</h2>
    <span className="image main">
      <StaticImage formats={['auto', 'webp']} src="../../static/assets/menu.png" alt="Menu" />
    </span>
  </Card>
);

Menu.propTypes = {
  articleClassName: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
  onCloseArticle: PropTypes.func.isRequired,
};

export default Menu;
