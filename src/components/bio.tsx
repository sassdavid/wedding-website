import * as React from 'react';
import BDLogo from '../../static/assets/bdlogo_100x100.svg';

const Bio = () => {
  return (
    <div className="bio">
      <BDLogo
        className="bio-avatar"
        formats={['auto', 'webp']}
        quality={95}
        alt="Profile Picture" />

      {/*<StaticImage
        className="bio-avatar"
        objectPosition="50% 50%"
        formats={['auto', 'webp']}
        src="../../static/assets/bdlogo.png"
        quality={95}
        alt="Profile Picture" />*/}
    </div>
  );
};

export default Bio;
