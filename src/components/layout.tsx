import React from 'react';
import PropTypes from 'prop-types';
import { SiGnuprivacyguard } from 'react-icons/si';
import '../assets/scss/main.scss';

const Layout = ({ children }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
