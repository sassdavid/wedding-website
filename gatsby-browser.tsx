import * as React from 'react';
import type { GatsbyBrowser } from 'gatsby';
import Layout from './src/components/layout';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element, props }) => {
  if (props.location.pathname !== '/') {
    return <Layout>{element}</Layout>;
  }

  return element;
};

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(`This application has been updated. Reload to display the latest version?`);

  if (answer === true) {
    window.location.reload();
  }
};
