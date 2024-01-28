import React from 'react';
import PropTypes from 'prop-types';
import { RiHeart2Line } from '@react-icons/all-files/ri/RiHeart2Line';
import { SiGnuprivacyguard } from '@react-icons/all-files/si/SiGnuprivacyguard';

const Footer = props => (
  <footer id="footer" style={props.timeout ? { display: 'none' } : {}}>
    <p className="copyright">
      &copy; Dimension V4{' '}
      <span>
        <RiHeart2Line
          style={{
            lineHeight: 'inherit',
            fontSize: '0.8rem',
            color: 'red',
          }}
        />
      </span>{' '}
      Gatsby Starter{' '}
      <span>
        <SiGnuprivacyguard
          style={{
            lineHeight: 'inherit',
            fontSize: '0.8rem',
            color: 'yellow',
          }}
        />
      </span>{' '}
      <a href="/privacy">Privacy</a> Built with: <a href="https://www.gatsbyjs.org/" target="_blank"
                                                    rel="noopener noreferrer nofollow">Gatsby.js v5.13.3</a>
    </p>
  </footer>
);

Footer.propTypes = {
  timeout: PropTypes.bool,
};

export default Footer;
