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
        <h1 style={{fontFamily: 'Orbitron Variable, sans-serif'}}>Bianka & Dávid</h1>
        <p>
          Ezen az oldalon találod az esküvőnkkel kapcsolatos fontos információkat.
          <br />
          <br className="just-margin" />
          Visszaszámlálás:
          <br />
          <br className="just-margin" />
          <CountdownTimer toDateWithHour="2024-10-04 17:00" />
        </p>
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <button onClick={() => {
            props.onOpenArticle('proposal');
          }}>
            Lánykérés
          </button>
        </li>
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
            props.onOpenArticle('rsvp');
          }}>
            Visszajelzés
          </button>
        </li>
        <li>
          <button onClick={() => {
            props.onOpenArticle('program');
          }}>
            Program
          </button>
        </li>
        {/*<li>
          <button onClick={() => { props.onOpenArticle('seatingchart'); }}>
            Ülésrend
          </button>
        </li>*/}
        <li>
          <button onClick={() => { props.onOpenArticle('menu'); }}>
            Menü
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
