import React from 'react';
import { Link } from 'gatsby';
import { RiArrowLeftSLine } from '@react-icons/all-files/ri/RiArrowLeftSLine';
import { RiCheckboxCircleLine } from '@react-icons/all-files/ri/RiCheckboxCircleLine';
import Layout from '../components/layout';
import { useLocation } from '@reach/router';

const Thanks = () => {
  const location = useLocation();
  const fillerName = location.state?.fillerName;
  const fillerEmail = location.state?.fillerEmail;

  return (
    <Layout>
    <div
      className="wrapper"
      style={{
        textAlign: 'center',
      }}>
      <RiCheckboxCircleLine
        style={{
          fontSize: '128px',
          color: 'gray',
        }} />
      {!fillerEmail && (
        <React.Fragment>
          <h2>Köszönjük {fillerName},</h2>
          <p>hogy kitöltötted az űrlapot, és ezzel jelezted, hogy részt tudsz-e venni az esküvőnkön!</p>
          <p>Bármilyen extra kérés eseten keress minket privátban.</p>
        </React.Fragment>
      )}
      {fillerName && fillerEmail && (
        <React.Fragment>
          <h2>Kedves {fillerName},</h2>
          <p>korábban már kitöltötted az űrlapot a(z) {fillerEmail} címmel!</p>
          <p>Amennyiben bármilyen módosítást szeretnél felénk jelezni, keress minket privátban.</p>
        </React.Fragment>
      )}
      <Link to="/" className="button">
        <RiArrowLeftSLine
          className="button-icon"
          style={{
            fontSize: '1.5rem',
            color: 'gray',
          }}
        />
        Vissza a főoldalra
      </Link>
    </div>
  </Layout>
  );
};

export default Thanks;
