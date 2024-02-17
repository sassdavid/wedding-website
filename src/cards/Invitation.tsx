import React from 'react';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';
import Card from '@/components/Card';

const Invitation = (props) => (
  <Card id="invitation" style={props.style} onCloseArticle={props.onCloseArticle} articleClassName={props.articleClassName}>
    <h2 className="major">Meghívó</h2>
    <span className="image main">
      <StaticImage formats={['auto', 'webp']} src="../../static/assets/bd-wedding-invitation.png" alt="Invitation" />
    </span>

    <p style={{ textAlign: 'center' }}>
      Azt kérded magadban, mit vegyek?<br/>
      Minek örülnének?<br/>
      Megsúgom én halkan: egy hajlék melegének.<br/>
      Borítékba tedd hát, mit ajándékra szántál,<br/>
      Hogy rajta álljon neved egy-egy sor téglán!<br/>
      S ha miénk lett már az a meghitt otthon,<br/>
      Szíves vendég leszel, ezt ígérhetjük bizton!<br/>
    </p>
  </Card>
);

Invitation.propTypes = {
  articleClassName: PropTypes.string.isRequired,
  style: PropTypes.any.isRequired,
  onCloseArticle: PropTypes.func.isRequired,
};

export default Invitation;
