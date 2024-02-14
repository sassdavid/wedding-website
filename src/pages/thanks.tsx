import React from 'react';
import { Link } from 'gatsby';
import { RiArrowLeftSLine, RiCheckboxCircleLine } from 'react-icons/ri';
import Layout from '../components/layout';
import { useLocation } from '@reach/router';
import SEO from '@/components/Seo';

const Thanks = () => {
  const location = useLocation();
  const fillerName = location.state?.fillerName;
  const fillerEmail = location.state?.fillerEmail;

  return (
    <Layout>
      <div className="wrapper page">
        <RiCheckboxCircleLine style={{ fontSize: '5.5rem', color: 'gray', paddingBottom: '0.5rem' }} />
        {!fillerEmail && (
          <React.Fragment>
            <h2>Köszönjük {fillerName},</h2>
            <p>hogy kitöltötted az űrlapot, és ezzel jelezted, hogy részt tudsz-e venni az esküvőnkön!</p>
            <p>
              Bármilyen extra kérés esetén keress minket a privát elérhetőségeink egyikén vagy
              írj nekünk <a href="mailto:kovacs.bianka4@gmail.com;david.sass14@gmail.com">emailt</a>.
            </p>
          </React.Fragment>
        )}
        {fillerName && fillerEmail && (
          <React.Fragment>
            <h2>Kedves {fillerName},</h2>
            <p>korábban már kitöltötted az űrlapot a(z) {fillerEmail} címmel!</p>
            <p>
              Amennyiben bármilyen módosítást szeretnél felénk jelezni, keress minket a privát elérhetőségeink egyikén vagy
              írj nekünk <a href="mailto:kovacs.bianka4@gmail.com;david.sass14@gmail.com">emailt</a>.
            </p>
          </React.Fragment>
        )}
        <Link to="/" className="button">
          <RiArrowLeftSLine className="button-icon" style={{ fontSize: '1.5rem', color: 'gray' }} />
          Vissza a főoldalra
        </Link>
    </div>
  </Layout>
  );
};

export const Head = () => (
  <SEO title="Bianka & David | Thanks" />
);

export default Thanks;
