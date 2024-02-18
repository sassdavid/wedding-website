import React from 'react';
import PropTypes from 'prop-types';
import CookieConsent from 'react-cookie-consent';
import { SiGnuprivacyguard } from 'react-icons/si';
import '../assets/scss/main.scss';

const Layout = ({ children }) => {
  return (
    <>
      <div>{children}</div>
      <CookieConsent
        enableDeclineButton
        flipButtons
        location="bottom"
        buttonText="Elfogad"
        declineButtonText="Elutasít"
        cookieName="gatsby-google-gtag"
        style={{
          background: 'linear-gradient(to right, transparent, #171717)',
          textShadow: '2px 2px black',
        }}
        buttonStyle={{
          background: 'radial-gradient(circle at top right, #222, transparent)',
          color: 'white',
          fontWeight: 'bolder',
          borderRadius: '3px',
          border: '1px black',
          textShadow: '2px 2px black',
        }}>
        A weboldal cookikat használ a jobb felhasználói élmény elérése érdekében.{' '}
        <span
          style={{
            fontSize: '15px',
            textAlign: 'center',
            marginLeft: '10px',
          }}>
          <span className="icon -lock">
            <SiGnuprivacyguard />
          </span>{' '}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">Adatkezelési tájékoztató</a>
        </span>
      </CookieConsent>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
