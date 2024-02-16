import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@/components/Card';
import Video from '@/components/Video';
import { StaticImage } from 'gatsby-plugin-image';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useSwipeable } from 'react-swipeable';

const Proposal = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const prevPage = () => {
    setCurrentPage(currentPage => Math.max(1, currentPage - 1));
  };

  const nextPage = () => {
    setCurrentPage(currentPage => Math.min(totalPages, currentPage + 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextPage(),
    onSwipedRight: () => prevPage(),
    preventScrollOnSwipe: true,
    trackMouse: false,
    trackTouch: true,
  });

  const renderCurrentImage = () => {
    switch ( currentPage ) {
      case 1:
        return <StaticImage formats={['auto', 'webp']} src="../../static/assets/pic01.jpg" alt="Proposal" />;
      case 2:
        return <StaticImage formats={['auto', 'webp']} src="../../static/assets/pic02.jpg" alt="Proposal" />;
      case 3:
        return <StaticImage formats={['auto', 'webp']} src="../../static/assets/pic03.jpg" alt="Proposal" />;
      default:
        return null;
    }
  };

  return (
    <Card id="Proposal" style={props.style} onCloseArticle={props.onCloseArticle} articleClassName={props.articleClassName}>
      <h2 className="major">Lánykérés</h2>

      <div className="embedded-video" style={{ marginBottom: '2rem' }}>
        {/*{props.isVideoVisible && <Video videoSrcURL="" videoTitle="Lánykérés 2023" />}*/}
      </div>

      <div {...handlers} className="image-gallery" style={{ marginBottom: '1rem' }}>
        {renderCurrentImage()}
      </div>

      <div className="image-paginator">
        <RiArrowLeftSLine className={currentPage === 1 ? 'disabled-paginator-icon' : 'paginator-icon'}
                          onClick={currentPage === 1 ? undefined : prevPage} />
        <span className="page-indicator">{currentPage} / {totalPages}</span>
        <RiArrowRightSLine className={currentPage === totalPages ? 'disabled-paginator-icon' : 'paginator-icon'}
                           onClick={currentPage === totalPages ? undefined : nextPage} />
      </div>
    </Card>
  );
};

Proposal.propTypes = {
  articleClassName: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
  onCloseArticle: PropTypes.func.isRequired,
  isVideoVisible: PropTypes.bool.isRequired,
};

export default Proposal;
