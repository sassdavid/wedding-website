import * as React from 'react';
import ReactDOM from 'react-dom/client';
import type { GatsbyBrowser } from 'gatsby';
import Layout from './src/components/layout';

export const replaceHydrateFunction = () => {
  return (element, container) => {
    const root = ReactDOM.createRoot(container);
    root.render(element);
  };
};

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element, props }) => {
  if ( props.location.pathname !== '/' ) {
    return <Layout {...props}>{element}</Layout>;
  }

  return element;
};

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(`This application has been updated. Reload to display the latest version?`);

  if ( answer === true ) {
    window.location.reload();
  }
};
