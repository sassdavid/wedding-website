import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineMail } from 'react-icons/hi';

const Footer = props => (
  <footer id="footer" style={props.timeout ? { display: 'none' } : {}}>
    <p className="copyright">
      Itt értek el minket:{' '}
      <span>
        <HiOutlineMail
          style={{
            fontSize: '0.8rem',
            color: 'white',
            verticalAlign: 'middle',
          }}
        />
      </span>{' '}
      <a href="mailto:kovacs.bianka4@gmail.com;david.sass14@gmail.com">E-mailt írok</a>{' '}
    </p>
  </footer>
);

Footer.propTypes = {
  timeout: PropTypes.bool,
};

export default Footer;
