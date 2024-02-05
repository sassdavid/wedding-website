import React from 'react';
import PropTypes from 'prop-types';

const Card = props => {
  const close = (
    <div
      className="close"
      onClick={() => {
        props.onCloseArticle();
      }}>
    </div>
  );

  return (
    <article
      id={props.id}
      className={props.articleClassName}
      style={props.style}>
        {props.children}
      {close}
    </article>
  );
};

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  id: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  articleClassName: PropTypes.string.isRequired,
  onCloseArticle: PropTypes.func.isRequired,
};

export default Card;
