import React from 'react';
import PropTypes from 'prop-types';
import Bio from './bio';
import CountdownTimer from '@/components/CountdownTimer';

const Header = props => (
  <header id="header" style={props.timeout ? { display: 'none' } : {}}>
    <div className="logo">
      <Bio className="icon" />
    </div>
    <div className="content">
      <div className="inner">
        <h1>Bianka & Dávid</h1>
        <p>
          A fully responsive site template designed by <a href="https://donboulton.com">Don Boulton</a> and released
          <br />
          for free under a <a href="https://donboulton.com/privacy">BSD</a> license.
          <br />
          <br />
          Hátralévő napok száma: <CountdownTimer toDateWithHour="2024-10-04 17:00" />
        </p>
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <button onClick={() => {
            props.onOpenArticle('invitation');
          }}>
            Meghívó
          </button>
        </li>
        <li>
          <button onClick={() => {
            props.onOpenArticle('venue');
          }}>
            Helyszín
          </button>
        </li>
        <li>
          <button onClick={() => {
            props.onOpenArticle('program');
          }}>
            Program
          </button>
        </li>
        <li>
          <button onClick={() => {
            props.onOpenArticle('proposal');
          }}>
            Lánykérés
          </button>
        </li>
        <li>
          <button onClick={() => { props.onOpenArticle('seatingchart'); }}>
            Ülésrend
          </button>
        </li>
        <li>
          <button onClick={() => { props.onOpenArticle('menu'); }}>
            Menü
          </button>
        </li>
        <li>
          <button onClick={() => {
            props.onOpenArticle('rsvp');
          }}>
            Visszajelzés
          </button>
        </li>
      </ul>
    </nav>
  </header>
);

Header.propTypes = {
  onOpenArticle: PropTypes.func,
  timeout: PropTypes.bool,
};

export default Header;
