import React from 'react';
import { Link } from 'gatsby';
import { RiArrowLeftSLine, RiSkullLine } from 'react-icons/ri';
import Layout from '../components/layout';

const NotFound = () => (
  <Layout className="not-found-page">
    <div className="wrapper not-found-page-wrapper" style={{ textAlign: 'center' }}>
      <header>
        <RiSkullLine style={{ fontSize: '6rem', color: 'gray', paddingBottom: '0.5rem' }} />
        <h1>Oops valami nem várt dolog történt!</h1>
        <p>Úgy tűnik, hogy az általad keresett oldal nem található.</p>
      </header>
      <Link to="/" className="button">
        <RiArrowLeftSLine className="button-icon" style={{ fontSize: '1.5rem', color: 'gray' }} />
        Vissza a főoldalra
      </Link>
    </div>
  </Layout>
);

export default NotFound;
