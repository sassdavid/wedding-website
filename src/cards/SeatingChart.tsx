import React from 'react';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';
import Card from '@/components/Card';

const SeatingChart = (props) => (
  <Card id="SeatingChart" style={props.style} onCloseArticle={props.onCloseArticle} articleClassName={props.articleClassName}>
    <h2 className="major">Ültetési rend</h2>
    <span className="image main">
        {/*<StaticImage formats={['auto', 'webp']} src="../../static/assets/pic02.jpg" alt="SeatingChart" />*/}
    </span>
  </Card>
);

SeatingChart.propTypes = {
  articleClassName: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
  onCloseArticle: PropTypes.func.isRequired,
};

export default SeatingChart;
